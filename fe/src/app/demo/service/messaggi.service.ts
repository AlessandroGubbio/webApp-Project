import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Messaggi, MessaggioClass } from "src/app/dto/messaggi.dto";
import { User } from "src/app/dto/user.dto";

@Injectable()
export class MessaggiService{
    constructor( private http: HttpClient) {}

    apiUrl: string = 'http://localhost:8080/messaggi/'

    getMessaggi(): Observable<Messaggi[]>{
        const currentUser: User = JSON.parse(localStorage.getItem('loggedUser') as string);
        return this.http.get<Messaggi[]>(this.apiUrl + currentUser.idUser)
    }

    deleteMessaggio(id: Number):Observable<any>{
        return this.http.delete<any>(this.apiUrl + 'delete/' + id)
    } 

    updateMessaggio(messaggio: Messaggi):Observable<any>{
        return this.http.put<any>(this.apiUrl + 'update', messaggio)
    } 

    setStatus(messaggio: Messaggi):Observable<any>{
        return this.http.get<any>(this.apiUrl + 'update/status/' + messaggio.idMessaggio)
    }

    sendMessage(messaggio: MessaggioClass): Observable<any>{
        return this.http.post<any>(this.apiUrl + 'send', messaggio)
    }
}