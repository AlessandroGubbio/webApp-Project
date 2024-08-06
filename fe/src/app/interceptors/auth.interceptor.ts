import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if(request.body && !request.headers.has('Content-Type')) {
        request = this.addHeader(request, 'Content-Type', 'application/json');
    }


      const currentUser = JSON.parse(localStorage.getItem('loggedUser'));


        if (currentUser && currentUser.idUser) {
            return next.handle(request);
        }

        console.log('User not logged!')

        this.router.navigate(['auth/login']);

        if (request.body) {
            request = this.addHeader(request, 'content-type', 'application/json');
          }
        return next.handle(request);

    }

    private addHeader(request: HttpRequest<any>, headerName: string, value: string): HttpRequest<any> {
        return request.clone({
          headers: request.headers.set(headerName, value)
        });
      }
}