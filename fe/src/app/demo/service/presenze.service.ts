import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Presenza, PresenzaClass } from "src/app/dto/presenza.dto";
import { User } from "src/app/dto/user.dto";

@Injectable()
export class PresenzeService{
    constructor(private http: HttpClient){}

    apiUrl: string = 'http://localhost:8080/'

    getPresenze(): Observable<Presenza[]>{
        const currentUser: User = JSON.parse(localStorage.getItem('loggedUser') as string);
        return this.http.get<Presenza[]>(this.apiUrl + 'presenze/elenco/' + currentUser.idUser);
    }

    savePresenza(presenza: PresenzaClass): Observable<PresenzaClass>{
      return this.http.post<PresenzaClass>(this.apiUrl +'presenze/crea',  presenza);
  
    }
    deleteById(presenza: number): Observable<any>{
      return this.http.delete(this.apiUrl + 'presenze/delete/' + presenza);
    }
  
    checkDate(idUtente: number, date: Date): Observable<Presenza>{
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0'); 
      const formattedDate = `${year}-${month}-${day}`;
      console.log(formattedDate)
      const url = `${this.apiUrl + 'presenze/cerca'}?idUtente=${idUtente}&date=${formattedDate}`;
      return this.http.get<Presenza>(url)
    }

    async getData(): Promise<any> {
      try {
        const currentUser: User = JSON.parse(localStorage.getItem('loggedUser') as string)
        const response = await this.http.get(this.apiUrl + 'presenze/elenco/' + currentUser.idUser).toPromise();
        return response;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error; 
      }
    }

}