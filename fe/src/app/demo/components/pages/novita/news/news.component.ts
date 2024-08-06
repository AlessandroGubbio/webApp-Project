import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { NewsService } from 'src/app/demo/service/news.service';
import { News, NewsDto } from 'src/app/dto/user.dto';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
      PanelModule,
      CommonModule,
      PaginatorModule, 
      InputTextModule,
      TableModule, 
      ScrollTopModule,
      SkeletonModule,
      ImageModule
    ],
  templateUrl: './news.component.html',
  providers: []
})
export class NewsComponent implements OnInit{
  news: NewsDto[]; 
  newsFull: NewsDto[]; 

  first = 0;
  rows = 5;
  totalRecords = 0;

  searchTerm: string = '';

  @ViewChild('skeletonTemplate') skeletonTemplate: any;


  constructor(private newsService: NewsService) { }

  hideSkeleton() {
    if (this.skeletonTemplate && this.news.length > 0) {
        console.log(this.news.length)
        this.skeletonTemplate.nativeElement.style.display = 'none';
    }
}

  ngOnInit(): void {
    this.newsService.getAllNews().subscribe(
      (data) => {this.news = data, this.newsFull = data, console.log(data), this.totalRecords = this.news.length, this.hideSkeleton()},
      (error) => console.error(error)
    )
  }

  searchNews() {
    if (this.searchTerm) {
      this.news = this.newsFull.filter(
        (news) => news.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    } else {
      this.news = this.newsFull;
    }
  }


}


