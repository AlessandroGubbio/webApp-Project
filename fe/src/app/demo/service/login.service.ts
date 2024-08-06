import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Role, User, UserDto } from "src/app/dto/user.dto";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {}

  apiUrl: string = 'http://localhost:8080/'

  callLoginService(dto: any): Observable<any> {
    return this.httpClient.post(this.apiUrl + 'doLogin', JSON.stringify(dto));
  }
  
  getAllUser(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.apiUrl + 'impiegati')
  }

  deleteAccount(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.apiUrl + 'delete/' + id)
  }

  updateInfo(userDto: User): Observable<any>{
    return this.httpClient.put<any>(this.apiUrl + 'updateUtente', userDto)
  }

  checkAdmin(userDto : number): Observable<Role[]>{
    return this.httpClient.get<Role[]>(this.apiUrl + 'checkAdmin/'+ userDto)
  }

}