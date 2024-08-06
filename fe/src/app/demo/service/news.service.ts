import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News, NewsDto } from 'src/app/dto/user.dto';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private httpClient: HttpClient) {
    
  }

  apiUrl: string = 'http://localhost:8080/'

  getAllNews(): Observable<News[]> {
    return this.httpClient.get<News[]>(this.apiUrl + 'homenews');
  }

  upload(data: NewsDto): Observable<Object>{
    return this.httpClient.post<Object>(this.apiUrl + "news/upload", data)
  }

  findById(id: number): Observable<NewsDto>{
    return this.httpClient.get<News>(this.apiUrl +'search/' + id)
  }

  deleteNews(id: number): Observable<Object>{
    return this.httpClient.delete<Object>(this.apiUrl + 'news/delete/' + id)
  }

  getById(id: number){
    return this.httpClient.get<News>( this.apiUrl + 'search/' + id)
  }

  updateById(news: News): Observable<News>{
    return this.httpClient.put<News>(this.apiUrl + "news/update/" + news.idNews, news)
  }

}
