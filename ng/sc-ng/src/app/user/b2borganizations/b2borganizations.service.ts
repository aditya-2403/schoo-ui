import { Injectable } from '@angular/core';
import { AppService } from '../../app.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class B2bOrganizationService {
    constructor(private appservice: AppService,
        private http: HttpClient) { }

    private baseUrl = this.appservice.userBaseURL;
    private courseBaseUrl = this.appservice.courseBaseURL;

    public getAssignPackageData(orgId) {
        const url = this.baseUrl + '/package/mapping/' + orgId;
        return this.http.get<string>(url);
    }

    public getPkgListData() {
        const url = `${this.baseUrl}/package`;
        return this.http.get(url);
    }

    public mapAssignPkgData(orgId, orgPkgId, payload) {
        const url = `${this.baseUrl}/package/assign/${orgId}/${orgPkgId}`;
        return this.http.post(url, payload);
    }

    public getOrgPkgDetails(orgId) {
        const url = `${this.baseUrl}/package/${orgId}`;
        return this.http.get(url);
    }

    public saveOrgPackage(payload) {
        const url = `${this.baseUrl}/package`;
        return this.http.post(url, payload);
    }

    public updateOrgPackage(payload) {
        const url = `${this.baseUrl}/package`;
        return this.http.put(url, payload);
    }

    public saveStudPackage(payload) {
        const url = `${this.baseUrl}/package/student`;
        return this.http.post(url, payload);
    }

    public getAllCourseList(): Observable<any> {
        const URL = this.appservice.courseBaseURL;
        return this.http.get(`${URL}/course`);
    }

    public getMapSubjectList(orgId, courseId) {
        const URL = `${this.courseBaseUrl}/subject/mapped/${orgId}/${courseId}`;
        return this.http.get(URL);
    }

    public getunMapSubjectExamList(orgId, courseId) {
        const URL = `${this.courseBaseUrl}/subject/unmapped/${orgId}/${courseId}`;
        return this.http.get(URL);
    }

    public orgCourseMappingData(orgId, orgPkgId, payload) {
        const url = `${this.courseBaseUrl}/subject/assign/${orgId}/${orgPkgId}`;
        return this.http.post(url, payload);
    }

    public startSession(payload) {
        const url = `${this.baseUrl}/session`;
        return this.http.post(url, payload);
    }

    public getUnMappedExamList(orgId): Observable<any> {
        const url = `${this.courseBaseUrl}/exam/unmapped/${orgId}`;
        return this.http.get(url);
    }

    public getMappedExamList(orgId): Observable<any> {
        const url = `${this.courseBaseUrl}/exam/mapped/${orgId}`;
        return this.http.get(url);
    }

    public updateExamMapList(orgId, payload): Observable<any> {
        const url = `${this.courseBaseUrl}/exam/assign/${orgId}`;
        return this.http.post(url, payload);
    }
}