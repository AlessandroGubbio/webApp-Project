import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Progetto, ProgettoFull } from "src/app/dto/cedolino.dto";

@Injectable()
export class ProgettiService{

    constructor(private http:HttpClient){}

    apiUrl: string = 'http://localhost:8080/progetti/'

    insertProgetto(progetto: ProgettoFull): Observable<Object>{
        return this.http.post<Object>(this.apiUrl + 'crea', progetto)
    }

    getProgetti(): Observable<ProgettoFull[]>{
        return this.http.get<ProgettoFull[]>(this.apiUrl + 'all' );
      }

    deleteProgetto(id : Number):Observable<any>{
        return this.http.delete<any>(this.apiUrl + 'delete/' + id)
    }
}