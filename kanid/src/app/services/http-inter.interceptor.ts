import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown> ,next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const sellerToken = localStorage.getItem('seller-token');
    const userToken = localStorage.getItem('token');
    if (sellerToken) {
      request = request.clone({
        setHeaders: {
          Authorization: sellerToken
        }
      })

    }
    if (userToken) {

      request = request.clone({
        setHeaders: {
          Authorization: userToken
        }
      })
    }
    return next.handle(request);

  }
}
