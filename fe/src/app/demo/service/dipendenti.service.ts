import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cU } from '@fullcalendar/core/internal-common';
import { Observable, map } from 'rxjs';


import { User } from 'src/app/dto/user.dto';

@Injectable()
export class DipendentiService {

    
  constructor(private http: HttpClient) {}

  apiUrl: string = 'http://localhost:8080/'

  getDipendenti(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + 'impiegati');
  }

}

    