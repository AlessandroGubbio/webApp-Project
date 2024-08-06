import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cU } from '@fullcalendar/core/internal-common';
import { Observable, map } from 'rxjs';
import { Cedolino, DocDto } from 'src/app/dto/cedolino.dto';
import { User } from 'src/app/dto/user.dto';

@Injectable()
export class CedoliniService {

    
  constructor(private http: HttpClient) {}

  apiUrl: string = 'http://localhost:8080/'

  getCedolini(): Observable<Cedolino[]> {
      const currentUser: User = JSON.parse(localStorage.getItem('loggedUser') as string);
      return this.http.get<Cedolino[]>(this.apiUrl + 'cedolini/elenco/' + currentUser.idUser);
  }

  getCedoliniForSpecificUser(userId: Number): Observable<Cedolino[]> {
    return this.http.get<Cedolino[]>(this.apiUrl + 'cedolini/elenco/' + userId);
}

  insertDocumentService(formData: FormData): Observable<Object> {
    return this.http.post<Object>(this.apiUrl + 'cedolini/upload', formData);
  }

  callInsertDocumentService(doc: DocDto):Observable<Object>{
      return this.http.post<Object>(this.apiUrl + 'cedolini/upload', doc)
  }

  updateRecord(doc: Cedolino):Observable<any>{
    return this.http.put<any>(this.apiUrl + 'cedolini/update', doc)
  }

  deleteRecord(id: Number):Observable<any>{
    return this.http.delete<any>(this.apiUrl + 'cedolini/delete/'+ id)
  }

}
