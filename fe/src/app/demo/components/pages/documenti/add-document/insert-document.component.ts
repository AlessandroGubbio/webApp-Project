import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CedoliniService } from 'src/app/demo/service/cedolini.service';
import { User, UserDto } from 'src/app/dto/user.dto';
import { LoginService } from 'src/app/demo/service/login.service';
import { HttpClient } from '@angular/common/http';
import { DocDto } from 'src/app/dto/cedolino.dto';


@Component({
    selector: 'insert-document',
    templateUrl: './insert-document.component.html',
    providers: [MessageService],
    styleUrl: "./insert-document.component.scss"
})
export class InsertDocumentComponent implements OnInit {
    
    showFile = false;
    searchTerm: string = '';
    impiegato: User[] = [];
    impiegatoFull: User[] = [];
    uploadedFiles: any[] = [];
    insertDocumentForm!: FormGroup;
    selectedFile: File;
    doc: DocDto = new DocDto();
    subscription!: Subscription;
    date1: Date | undefined;
  


    constructor(
        private messageService: MessageService, 
        private loginService: LoginService,
        private formBuilder: FormBuilder, 
        private cedoliniService: CedoliniService,
        private router: Router
    ) {}
 
    ngOnInit(): void {
        this.initializeForm();
        this.loginService.getAllUser().subscribe(
            user => {this.impiegato = user,this.impiegatoFull = user,  console.log(user)},
            error => console.log(error)
        )
    }


    initializeForm() {
        this.insertDocumentForm = this.formBuilder.group({
            file: [null, Validators.required],
            date: [null, Validators.required],
            userId: [null, Validators.required]         
        });
      }

    

    searchUser() {
        if (this.searchTerm) {
          this.impiegato = this.impiegatoFull.filter(
            (impiegato =>
              impiegato.nome.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
              impiegato.cognome.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
              impiegato.mail.toLowerCase().includes(this.searchTerm.toLowerCase())
          ));
        } else {
          this.loginService.getAllUser().subscribe(
            user => {
              this.impiegato = user;
            },
            error => console.log(error)
          );
        }
      }
      
    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
      this.showFile = true;
      const file = event.target.files[0];
      console.log("file:", file)
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
          this.doc.pdfBase64 = reader.result as string;
          this.doc.pdfBase64 = this.doc.pdfBase64?.replace( 'data:application/pdf;base64,', '' );
          console.log(this.doc.pdfBase64)
      };
    }
      

    insertDocument(){
      if (this.selectedFile) {
        this.doc.userId = this.insertDocumentForm.value.userId
        this.doc.date = this.insertDocumentForm.value.date
        console.log(this.doc)
        this.cedoliniService.callInsertDocumentService(this.doc).subscribe(response => {
          console.log('Data inserted successfully!', response);
          this.messageService.add({severity:'success', detail:'Documento inserito!'})
        },
        error => {
          console.error('Error while inserting file:', error);
          this.messageService.add({severity:'error', detail:'Errore nell\'inserimento del documento'})
        });;
        } 
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe;
    }
}
