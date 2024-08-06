import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from 'src/app/demo/service/news.service';
import { PanelModule } from 'primeng/panel';
import { NewsComponent } from './news.component';
import { NewsRoutingModule } from './news-routing.module';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PanelModule,
    NewsComponent,
    NewsRoutingModule,
    PaginatorModule,
    TableModule
  ],
  providers: [NewsService],
})
export class NewsModule { }
