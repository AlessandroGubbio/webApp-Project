import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from 'src/app/demo/service/news.service';
import { PostComponent } from './post.component';
import { PostRoutingModule } from './post-routing.module';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PostComponent,
    PostRoutingModule
  ],
  providers: [NewsService, MessageService],
})
export class PostModule { }
