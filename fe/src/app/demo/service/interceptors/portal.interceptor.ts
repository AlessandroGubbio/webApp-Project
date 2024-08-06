import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap, catchError, throwError } from "rxjs";

@Injectable()
export class PortalInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler) {
        if(httpRequest.body && !(httpRequest.body instanceof FormData) && !httpRequest.headers.has('Content-Type')) {
            httpRequest = this.addHeader(httpRequest, 'Content-Type', 'application/json');
        }

        // send cloned request with header to the next handler.

        return httpHandler.handle(httpRequest).pipe(

            tap(event => {
                if (event instanceof HttpResponse) {
                    return event.body;
                }
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError("Errore");
            })
        );
    }
    

    addHeader(httpRequest: HttpRequest<any>, headerName: string, value:string): HttpRequest<any> {
        return httpRequest.clone({
            headers: httpRequest.headers.set(headerName, value)
        })
    }
}