import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { MessaggiService } from 'src/app/demo/service/messaggi.service';
import { Messaggi, MessaggioClass } from 'src/app/dto/messaggi.dto';
import { FieldsetModule } from 'primeng/fieldset';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { User, UserClass, UserDto } from 'src/app/dto/user.dto';
import { LoginService } from 'src/app/demo/service/login.service';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}


@Component({
    selector: 'app-messaggi',
    templateUrl: './messaggi.component.html',
    styleUrl: './messaggi.component.scss',
    standalone: true,
    imports: [
      TableModule,
      TagModule,
      ToastModule,
      ButtonModule,
      CommonModule,
      DialogModule,
      FieldsetModule,
      DatePipe,
      TooltipModule,
      FormsModule,
      ReactiveFormsModule,
      InputTextModule,
      InputTextareaModule,
      InputGroupModule,
      AutoCompleteModule
    ],
    providers: [MessaggiService, MessageService]
})
export class MessaggiComponent implements OnInit{

    messaggi: Messaggi[] = [];

    expandedRows = {};

    inputData: {risposta: string}

    visible: boolean = false;

    utenti: User [] = [];

    selectedUtente: any;

    titolo: any;

    messaggio: any;

    filteredUtente: UserDto[] | undefined;

    userString: string = localStorage.getItem('loggedUser')
    userdto: User | null = null


    constructor(
         private loginService: LoginService,
         private messaggiService: MessaggiService, 
         private messageService: MessageService,
         private datePipe: DatePipe
        ) {}

    ngOnInit() {
      this.inputData = { risposta: ''};
      this.messaggiService.getMessaggi().subscribe(
        {
            next: (messaggio)=>{
                this.messaggi = messaggio
            },
            error: (err)=>{console.error(err)}
        }
      )
      this.loginService.getAllUser().subscribe(
        {
            next: (utente) =>{
                this.utenti = utente
            }
        }
      )
    this.checkIfMessaggi()
      
    }

    checkIfMessaggi(){
      if(this.messaggi.length === 0){
        console.log(true)
        this.messageService.add({severity: 'info', detail: 'Nessun Messaggio Trovato'})
      }
    }

    filterUtenti(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < (this.utenti as any[]).length; i++) {
            let utente = (this.utenti as any[])[i];
            if (utente.mail.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(utente);
            }
        }
        if(filtered.length === 0){
            filtered.push({mail: 'Nessun Risultato'})
        }
        console.log(filtered)

        this.filteredUtente = filtered;
    }

    expandAll() {
        this.expandedRows = this.messaggi.reduce((acc, m) => (acc[m.idMessaggio] = true) && acc, {});
        this.messaggi.forEach(
            (messaggio) => {
                if(messaggio.status != true){
                    this.messaggiService.setStatus(messaggio).subscribe(
                    {
                        next: (res) => {
                            console.log(res)
                            this.messaggi[this.messaggi.indexOf(messaggio)].status = true
                        },
                        error: (err) => {
                            console.error(err);
                        }
                    })
                }
                
            }
        )
    }

    collapseAll() {
        this.expandedRows = {};
    }

    deleteMessagge(messaggio : Messaggi){
        console.log("delete")
        this.messaggiService.deleteMessaggio(messaggio.idMessaggio).subscribe(
            {next: (next) => {
                const messageIndex = this.messaggi.findIndex(m => m.idMessaggio === messaggio.idMessaggio);
                if(messageIndex != -1){
                    this.messaggi.splice(messageIndex, 1);
                    this.messageService.add({severity: 'success', detail: 'Messaggio eliminato'})
                }
            },
            error: (error) => {
                this.messageService.add({severity: 'danger', detail: 'Errore nella cancellazione del messaggio'})
            }
        })
    }

    handleInputRisposta(event: Event) {
        const target = event.target as HTMLInputElement;
        this.inputData.risposta = target.value;
    }

    updateMessaggio(messaggio : Messaggi) {
        messaggio.testoRisposta = this.inputData.risposta;
        console.log(messaggio)
        
        this.messaggiService.updateMessaggio(messaggio).subscribe(
          (response) => {
            console.log('Messaggio inviato con successo:', response);
            this.messageService.add({severity: 'success', detail: 'Messaggio inviato'})
          },
          (error) => {
            console.error('Errore durante l\'invio del messaggio:', error);
            this.messageService.add({severity: 'danger', detail: 'Errore, impossibile inviare il messaggio'})
          }
        );
      }

    setStatus(messaggio : Messaggi){
        const index = this.messaggi.indexOf(messaggio)
        if(this.messaggi[index].status !== true){
            this.messaggiService.setStatus(messaggio).subscribe(
                (response) => {
                    this.messaggi[index].status = true
                    console.log('Status updated successfully:', response);
                  },
                  (error) => {
                    console.error('Error updating status:', error);
                }
            )
        }
    }

      toggleSeen(messaggio: any) {
        if (!messaggio.seen) {
            messaggio.status = true;
        }
    }
    
    getStatusSeverity(status: boolean) {
        return status ? 'success' : 'secondary';
    }

    getIcon(status: boolean){
        return status ? 'pi pi-check' : 'pi pi-info-circle'
    }

    formatDate(date: string){
        const formattedDate: Date = new Date(date)
        return (formattedDate.toLocaleString('it-IT', 
            {hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'long', year: 'numeric' }))
    }

    reset(){
      this.messaggi = []
      this.messaggiService.getMessaggi().subscribe(
        {
            next: (res) => {
                this.messaggi = res
                this.messageService.add({ severity: 'info', summary: 'Messaggi Ricaricati!', life: 3000 })
            }
        }
      )
    }

    showDialog(){
      this.visible = true;
    }

    closeDialog(){
        this.visible = false;
        this.titolo = null;
        this.messaggio = null;
        this.selectedUtente = null;
    }

    sendMail(){
        const messaggio = new MessaggioClass()
        this.userdto = JSON.parse(this.userString) as User;
        const mittente = new UserClass()
        const destinatario = new UserClass()

        mittente.idUser = this.userdto.idUser
        destinatario.idUser = this.selectedUtente.idUser
        

        messaggio.destinatario = destinatario as UserDto;
        messaggio.mittente = mittente as UserDto

        messaggio.titolo = this.titolo
        messaggio.testoMessaggio = this.messaggio

        console.log(messaggio)
        this.messaggiService.sendMessage(messaggio).subscribe(
            {
                next: (res)=>{
                    this.messageService.add({ severity: 'success', summary: 'Messaggio Inviato con Successo', life: 3000 })
                }
            }
        )

    }
}