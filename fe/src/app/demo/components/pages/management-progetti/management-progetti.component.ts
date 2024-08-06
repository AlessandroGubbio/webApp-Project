import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProgettoFull } from 'src/app/dto/cedolino.dto';
import { ProgettiService } from 'src/app/demo/service/progetti.service';


@Component({
    selector: 'management-progetti',
    templateUrl: './management-progetti.component.html',
    providers: [MessageService, ProgettiService],
    styleUrls: ['./management-progetti.component.scss']
})
export class ManagementProgettiComponent implements OnInit {
    
    searchTerm: string = '';
    progetti: ProgettoFull[] = [];
    progetto: ProgettoFull = new ProgettoFull();
    insertProgettoForm!: FormGroup;
    progettoFull: ProgettoFull[] = [];
    subscription!: Subscription;
    dataInizio: Date | undefined;
    dataFine: Date | undefined;
  


    constructor(
        private messageService: MessageService, 
        private formBuilder: FormBuilder, 
        private progettiService: ProgettiService,
        private router: Router
    ) {}
 
    ngOnInit(): void {
        this.initializeForm();
        this.progettiService.getProgetti().subscribe(
            
            progetti => {this.progetti = progetti, this.progettoFull = progetti, console.log('Progetti data:', progetti);},
            

        )
    }


    initializeForm() {
        this.insertProgettoForm = this.formBuilder.group({
            nomeProgetto: [null, Validators.required],
            nomeCliente: [null, Validators.required],
            dataInizio: [null, Validators.required],
            dataFine: [null, Validators.required]         
        });
      }

    
    searchProject() {
        if (this.searchTerm) {
          this.progetti = this.progettoFull.filter(
            (progetto =>
              progetto.titolo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
              progetto.nome_cliente.toLowerCase().includes(this.searchTerm.toLowerCase())
          ));
        } else {
          this.progettiService.getProgetti().subscribe(
            progetto => {
              this.progetti = progetto;
            },
            error => console.log(error)
          );
        }
      }

      calculateProgress(): number {
        let completedInputs = 0;
        const totalInputs = 4;
      
        if (this.insertProgettoForm.value.nomeProgetto) {
          completedInputs++;
        }
        if (this.insertProgettoForm.value.nomeCliente) {
          completedInputs++;
        }
        if (this.insertProgettoForm.value.dataInizio) {
          completedInputs++;
        }
        if (this.insertProgettoForm.value.dataFine) {
          completedInputs++;
        }
      
        return Math.floor((completedInputs / totalInputs) * 100);
      }
      
      deleteRecord(progetto): void{
        this.progettiService.deleteProgetto(progetto.id_progetto).subscribe(
          (deletedProgetto) => {
            console.log(`Record with id: ${progetto.id_progetti} was deleted from database.`)
            const progettoIndex = this.progetti.findIndex(p => p.id_progetto === progetto.id_progetto);
            if (progettoIndex !== -1) {
              this.progetti.splice(progettoIndex, 1);
              this.messageService.add({ severity: 'success', detail: `Progetto con id: ${progetto.id_progetto} cancellato.` });
            }
          },
          (error) => {
            console.error('Error while deleting record ', error)
            this.messageService.add({severity: 'error', detail: `Errore nella cancellazione del progetto con id: ${progetto.id_progetto}.`})
          }
        )
      }

    insertProgetto(){
        this.progetto.titolo = this.insertProgettoForm.value.nomeProgetto
        this.progetto.nome_cliente = this.insertProgettoForm.value.nomeCliente
        this.progetto.data_inizio = this.insertProgettoForm.value.dataInizio
        this.progetto.data_fine = this.insertProgettoForm.value.dataFine
        
        this.progettiService.insertProgetto(this.progetto).subscribe(response => {
          this.progettiService.getProgetti().subscribe(progetti => {
            this.progetti = progetti;
          })
          console.log('Data inserted successfully!', response);
          this.messageService.add({severity:'success', detail:'Progetto inserito!'})
        },
        error => {
          console.error('Error while inserting progetto:', error);
          this.messageService.add({severity:'error', detail:'Errore nell\'inserimento del progetto'})
        });;
      } 
    

    ngOnDestroy(): void {
        this.subscription?.unsubscribe;
    }
}
