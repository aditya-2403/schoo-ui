import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppService } from '../app.service';

@Injectable({ providedIn: 'root' })
export class LoginService{
  constructor(private http: HttpClient, private appservice: AppService) {}


  getToken(username, password): Observable<any> {

   // const tokenURL = '//ec2-13-235-71-81.ap-south-1.compute.amazonaws.com:8083/sc/user/token';
    const tokenURL = this.appservice.userBaseURL + '/authorize/token';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const data = {
      username,
      password
    };
    return this.http.post<string>(tokenURL, data, httpOptions);
  }

}
