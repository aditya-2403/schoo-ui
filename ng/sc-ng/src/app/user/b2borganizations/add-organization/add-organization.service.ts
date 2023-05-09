
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../../app.service';

@Injectable({
  providedIn: 'root'
})
export class AddOrganizationService {
  baseUrl = this.appservice.userBaseURL;
  constructor(private http: HttpClient, private appservice: AppService) {}

  getOrganizationDetails(orgId): Observable<any> {
    const url = this.baseUrl + '/organizations/'+orgId;
    return this.http.get<string>(url);
  }

  saveOrganization(data): Observable<any> {
    const url = this.baseUrl + '/organizations';
    return this.http.post<string>(url, data);
  }

  updateOrganization(data): Observable<any> {
    const url = this.baseUrl + '/organizations';
    return this.http.put<string>(url, data);
  }

}
