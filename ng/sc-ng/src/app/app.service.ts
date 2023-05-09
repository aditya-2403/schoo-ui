import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AppService {
  userBaseURL = '';
  courseBaseURL = '';
  constructor(private http: HttpClient) {
    console.log('environemnt', environment.setting);
    this.userBaseURL = environment.setting.userBaseURL;
    this.courseBaseURL = environment.setting.courseBaseURL;
  }

  getMasterData(): Observable<any> {
    const masterDataURL = this.userBaseURL + '/master';
    return this.http.get<string>(masterDataURL);
  }

  public setTokenInStorage(res) {
    window.localStorage.setItem( 'token' , res.token);
    window.localStorage.setItem( 'reftoken' , res.reftoken);
  }

  public refreshToken() {
    const url = this.userBaseURL + '/refreshtoken';
    let headers: HttpHeaders = new HttpHeaders();
    const reToken = localStorage.getItem('reftoken');
    headers = headers.append('Authorization', reToken);
    return this.http.get(url, {
      headers
    }).pipe(tap((tokens: any) => {
      this.setTokenInStorage(tokens);
    }));

  }

}
