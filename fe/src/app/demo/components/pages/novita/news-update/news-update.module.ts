import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from 'src/app/demo/service/news.service';
import { PanelModule } from 'primeng/panel';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NewsUpdateComponent } from './news-update.component';
import { NewsUpdateRoutingModule } from './news-update-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PanelModule,
    NewsUpdateComponent,
    NewsUpdateRoutingModule,
    PaginatorModule,
    TableModule
  ],
  providers: [NewsService, MessageService, ConfirmationService],
})
export class NewsUpdateModule { }
