import { Observable, BehaviorSubject } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, finalize, switchMap, filter, take } from 'rxjs/operators';
import { ErrorHandlerService } from './error-dialog/error-dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../app.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private errorService: ErrorHandlerService, private spinner: NgxSpinnerService, private appService: AppService) { }

  public requestCount = 0;
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  private addToken(request: HttpRequest<any>): HttpRequest<any> {
    if (request.url.indexOf('/token') === -1 && request.url.indexOf('/refreshtoken') === -1) {
      const token: string = localStorage.getItem('token');
      if (token) {
        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
      }
    }
    if (request.body instanceof FormData) {
      request = request.clone({ headers: request.headers.set('Access-Control-Allow-Origin', '*') });
    } else {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }
    return request;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();
    this.requestCount++;
    request = this.addToken(request);
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('error===>', error, error.status);
        this.spinner.hide();
        if (error instanceof HttpErrorResponse && (error.status === 403 || error.status === 401)) {
          return this.HandleRefreshToken(request, next);
        } else {
          this.errorService.configureErrorDialog().handleError(error);
        }
      }), finalize(() => {
        this.requestCount--;
        if (this.requestCount === 0) {
          this.spinner.hide();
        }
      }));
  }

  public HandleRefreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null);
      return this.appService.refreshToken().pipe(
        switchMap(data => {
          this.tokenSubject.next(data.token);
          request = this.addToken(request);
          return next.handle(request);
        })
      );
    } else {
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(() => {
          request = this.addToken(request);
          return next.handle(request);
        }));
    }
  }
}
