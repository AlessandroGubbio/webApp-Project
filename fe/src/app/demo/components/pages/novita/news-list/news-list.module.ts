import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from 'src/app/demo/service/news.service';
import { PanelModule } from 'primeng/panel';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { NewsListComponent } from './news-list.component';
import { NewsListRoutingModule } from './news-list-routing.module';
import { MessageService } from 'primeng/api';
import { RouterLink, RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PanelModule,
    NewsListComponent,
    NewsListRoutingModule,
    PaginatorModule,
    TableModule,
    RouterModule,
    RouterLink
  ],
  providers: [NewsService, MessageService],
})
export class NewsListModule { }
