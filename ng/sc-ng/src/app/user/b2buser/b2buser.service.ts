import { Injectable } from '@angular/core';
import { AppService } from '../../app.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class B2buserService {

  constructor(private appservice: AppService,
    private http: HttpClient) { }

  private baseUrl = this.appservice.userBaseURL;
  private courseBaseUrl = this.appservice.courseBaseURL;

  public getOrganizations() {
    const url = `${this.baseUrl}/organizations`;
    return this.http.get(url);
  }
  public saveStudent(payload) {
    const url = `${this.baseUrl}/student`;
    return this.http.post(url, payload);
  }

  public saveTeacher(payload) {
    const url = `${this.baseUrl}/teacher`;
    return this.http.post(url, payload);
  }

  public resetUserPassword(userId) {
    const url = this.baseUrl + '/user/resetpassword/' + userId;
    return this.http.post(url, {});
  }

  public getCourseList(orgId): Observable<any> {
    return this.http.get(`${this.courseBaseUrl}/course/organization/${orgId}`);
  }

  public getSectionList(orgId, courseId): Observable<any> {
    return this.http.get(`${this.courseBaseUrl}/section/${orgId}/${courseId}`);
  }

  public getUnAssignSubjectToTeacher(orgId, teacherId, courseId, sectionId) {
    return this.http.get(`${this.courseBaseUrl}/subject/teacher/unassiged/${orgId}/${teacherId}?courseId=${courseId}&sectionId=${sectionId}`);
  }

  public getAssignSubjectToTeacher(orgId, teacherId, courseId, sectionId) {
    return this.http.get(`${this.courseBaseUrl}/subject/teacher/assiged/${orgId}/${teacherId}?courseId=${courseId}&sectionId=${sectionId}`);
  }

  public mapSubjectToTeacher(ids, payload) {
    return this.http.post(`${this.courseBaseUrl}/subject/teacher/assign/${ids.orgId}/${ids.teacherId}?sectionId=${ids.sectionId}&isClassTeacher=${ids.isClassTeacher}`, payload);
  }


}
