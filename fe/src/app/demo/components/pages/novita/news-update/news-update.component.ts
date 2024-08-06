import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Toast, ToastModule } from 'primeng/toast';
import { NewsService } from 'src/app/demo/service/news.service';
import { News } from 'src/app/dto/user.dto';

@Component({
  selector: 'app-news-update',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    InputMaskModule,
    InputTextareaModule,
    ToastModule,
    ButtonModule,
    FormsModule,
    InputGroupModule,
    ReactiveFormsModule,
    DialogModule,
    RouterModule,
    RouterLink

  ],
  templateUrl: './news-update.component.html',
  styleUrl: './news-update.component.scss'
})
export class NewsUpdateComponent {

  newsId: any;
  news: News;
  titolo: string = ''
  descrizione: string = ''

  visible: boolean = false;

  newsSubmit: News;

  selectedFile: File | null = null;
  showFile = false;

  constructor(private activatedRoute: ActivatedRoute,
    private newsService: NewsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
    ) {}

  handleInputTitolo(event: Event) {
    const target = event.target as HTMLInputElement;
    this.titolo = target.value;
  } 

  handleInputDescrizione(event: Event) {
    const target = event.target as HTMLInputElement;
    this.descrizione = target.value;
  } 

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.newsId = params.get('id');
    });
    console.log(this.newsId)
    this.newsService.getById(this.newsId).subscribe(
       {
        next: (data) => {
          this.news = data;
          this.titolo = data.title
          this.descrizione = data.description
          console.log(data)
          },
        error: (error) => {
          console.log(error);
        }
       }
    )
  }

  navigate(){
    this.router.navigate(['/extra/news-list'])
  }

  showDialog() {
      this.visible = true;
  }
  

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

  submitData(){
    this.newsSubmit = this.news
    this.newsSubmit.title = this.titolo
    this.newsSubmit.description = this.descrizione
    console.log("new news",this.newsSubmit)
    this.newsService.updateById(this.newsSubmit).subscribe();
    this.showDialog();
  }


}
