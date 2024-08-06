import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { NewsService } from 'src/app/demo/service/news.service';
import { News, NewsDto } from 'src/app/dto/user.dto';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    ButtonModule,
    RouterModule,
    RouterLink
  ],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss'
})
export class NewsListComponent {

  news: News[] = [];
  newsFull: News[];
  searchTerm: string = '';

  constructor(private newsService: NewsService,  private router: Router, private messageService: MessageService){}


  ngOnInit(): void {
    this.newsService.getAllNews().subscribe(
      (data) => {this.news = data, this.newsFull = data, console.log(data),

        this.news.sort((a, b) => {
          if (a.idNews < b.idNews) {
              return -1;
          }
          if (a.idNews > b.idNews) {
              return 1;
          }
          return 0;
      });

      },
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

  deleteNews(news: News){
    console.log(news.idNews)
    this.newsService.deleteNews(news.idNews).subscribe(
      {next: () => {
        console.log(`Record with id: ${news.idNews} was deleted from database.`)
        const userIndex = this.news.findIndex(u => u.idNews === news.idNews);
        if (userIndex !== -1) {
          this.news.splice(userIndex, 1);
          this.messageService.add({ severity: 'success', detail: `News con id: ${news.idNews} è stata cancellata.` });
        }
      },
      error: (error) => {
        console.error('Error while deleting record ', error)
        this.messageService.add({severity: 'error', detail: `News con id: ${news.idNews} non cancellata.`})
      }
    })
  }

}
