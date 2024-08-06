import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { UserDto, UserProfile } from "src/app/dto/user.dto";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) {}
  apiUrl: string = 'http://localhost:8080/'

  callRegisterService(data: UserProfile): Observable<any> {
    console.log(data);
    return this.httpClient.post(this.apiUrl + 'doRegister', data)
        .pipe(
            catchError(error => {
                console.error('Error registering user:', error);
                // Handle the error appropriately (e.g., throw a custom error)
                return throwError(error);
            })
        );
}
}