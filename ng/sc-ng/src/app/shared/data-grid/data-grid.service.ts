import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../app.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DataGridService {
    constructor(private http: HttpClient, private appservice: AppService) { }

    public getGridData(gridId, moduelName): Observable<any> {
        let baseURL = this.appservice.userBaseURL;
        if(moduelName == 'course'){
            baseURL = this.appservice.courseBaseURL;
        }
       
        const gridUrl = `${baseURL}/${gridId}`;
        return this.http.get(gridUrl);
    }

    public deleteGridData(gridId, rowId, moduelName) {
        let baseURL = this.appservice.userBaseURL;
        if(moduelName == 'course'){
            baseURL = this.appservice.courseBaseURL;
        }
        const gridUrl = `${baseURL}/${gridId}/${rowId}`;
        return this.http.delete(gridUrl);
    }
}
