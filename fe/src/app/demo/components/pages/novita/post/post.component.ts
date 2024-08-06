import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { RatingModule } from 'primeng/rating';
import { ListboxModule } from 'primeng/listbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LoginService } from 'src/app/demo/service/login.service';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/demo/service/news.service';
import { Subscription } from 'rxjs';
import { NewsDto } from 'src/app/dto/user.dto';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FileUploadModule,
    ToastModule,
    CommonModule,
		FormsModule,
		InputTextareaModule,
		InputTextModule,
		RatingModule,
		InputSwitchModule,
		ListboxModule,
		SelectButtonModule,
		CheckboxModule,
		ButtonModule,
		InputGroupModule,
		InputGroupAddonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  providers: [MessageService, NewsService]
})
export class PostComponent implements OnInit{

  newsForm!: FormGroup;
  subscription!: Subscription; 

  news: NewsDto = new NewsDto();
  selectedFile: File | null = null;
  showFile = false;
  

    constructor(
        public layoutService: LayoutService, 
        private formBuilder: FormBuilder, 
        private newsService: NewsService,
        private router: Router,
        private messageService: MessageService
    ) {
        
    }

//  CONVERT file into base 64 
    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
      this.showFile = true
      const file = event.target.files[0];
      console.log(file)
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
          this.news.image = reader.result as string;
          this.news.image = this.news.image?.replace( 'data:image/jpeg;base64,', '' );
          console.log(this.news.image)
      };
    }


    initializeForm() {
      this.newsForm = this.formBuilder.group({
          title: [null, Validators.required], 
          description: [null, Validators.required],
      })
    }

// SEND dto to be
  submitData() {
    if (this.selectedFile) {
      if(this.newsForm.value.title !== null && this.newsForm.value.description !== null){
        this.news.title = this.newsForm.value.title
        this.news.description = this.newsForm.value.description
        console.log(this.news)
          this.newsService.upload(this.news).subscribe();
          this.messageService.add({ severity: 'success', summary: 'Post', detail: 'L\'Articolo è stato postato nelle News' });
        }
        else{
          this.messageService.add({ severity: 'error', summary: 'Errore', detail: 'Inserisci titolo e descrizione per continuare'})
        }
      }
        
      else {
        this.messageService.add({ severity: 'error', summary: 'Errore', detail: 'Selezionare un\'immagine prima di continuare'})
      }
    }

    ngOnInit(): void {
      this.initializeForm();
    }


    // addNews(){
    //   if(this.newsForm.valid) {
    //     console.log(this.newsForm.value)
    //     this.newsService.insertNews(this.newsForm.value.image)

    //   }
        // this.subscription = this.newsService.insertNews(this.newsForm.value).subscribe({
        //       error: (errorResponse) => {
        //         alert('Errore di inserimento. Verificare la console');
        //         console.log(errorResponse);
        //       }
        //     })
        // } else {
        //     alert('Inserire tutti i dati necessari');
        // }
    // }

    // onFileUpload(event: any) {
    //   for(let file of event.files) {
    //     this.newsForm.patchValue({ image: file});
    //   }

    //   let file = event.files[0]
    //   const fileReader = new FileReader()
    //   fileReader.readAsDataURL(file)
  
    //   fileReader.onload = () => {
    //       // You'll get the base64 string here
    //       this.newsForm.patchValue({ image: fileReader.result })
    //       console.log("base64 :", fileReader.result)
    //   }
  
    //   fileReader.onerror = (error) => {
    //       console.log("Error reading file :", error)
    //   }
  
  // }

}
