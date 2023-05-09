import { Injectable } from '@angular/core';
import { AppService } from '../../app.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})

export class AcademicsService {
    constructor(
        private appservice: AppService,
        private http: HttpClient
    ) { }

    private courseBaseUrl = this.appservice.courseBaseURL;

    public getCourse(){
        const url = `${this.courseBaseUrl}/course`;
        return this.http.get(url);
    }

    public getCouseDetails(courseId){
        const url = `${this.courseBaseUrl}/course/${courseId}`;
        return this.http.get(url);
    }

    public getSubject(){
        const url = `${this.courseBaseUrl}/subject`;
        return this.http.get(url);
    }

    public getSubjectbyCourseId(courseId){
        const url = `${this.courseBaseUrl}/subject/course/${courseId}`;
        return this.http.get(url);
     }

    public getExamDetails(examId) {
        const url = `${this.courseBaseUrl}/exam/${examId}`;
        return this.http.get(url);
    }

    public saveExam(payload) {
        const url = `${this.courseBaseUrl}/exam`;
        return this.http.post(url, payload);
    }

    public updateExam(payload) {
        const url = `${this.courseBaseUrl}/exam`;
        return this.http.put(url, payload);
    }

    public getUnAssignSubjectToExam(courseId, examId) {
        return this.http.get(`${this.courseBaseUrl}/exam/unassigned/${courseId}/${examId}`);
    }
    
    public getAssignSubjectToExam(examId) {
        return this.http.get(`${this.courseBaseUrl}/exam/assiged/${examId}`);
    }

    public mapSubjectToExam(examId, payload) {
        return this.http.post(`${this.courseBaseUrl}/exam/attach/${examId}`, payload);
    }

    public getCourseDetails(courseId) {
        const url = `${this.courseBaseUrl}/course/${courseId}`;
        return this.http.get(url);
    }

    public saveCourse(payload) {
        const url = `${this.courseBaseUrl}/course`;
        return this.http.post(url, payload);
    }

    public updateCourse(payload) {
        const url = `${this.courseBaseUrl}/course`;
        return this.http.put(url, payload);
    }

    public getUnAssignSubjectToCourse(courseId) {
        return this.http.get(`${this.courseBaseUrl}/subject/unassiged/${courseId}`);
    }
    
    public getAssignSubjectToCourse(courseId) {
        return this.http.get(`${this.courseBaseUrl}/subject/course/${courseId}`);
    }

    public mapSubjectToCourse(courseId, payload) {
        return this.http.post(`${this.courseBaseUrl}/subject/assign/${courseId}`, payload);
    }
    

    public saveSection(payload) {
        const url = `${this.courseBaseUrl}/section`;
        return this.http.post(url, payload);
    }

    public getSubjectDetails(subjectId) {
        const url = `${this.courseBaseUrl}/subject/${subjectId}`;
        return this.http.get(url);
    }

    public saveSubject(payload) {
        const url = `${this.courseBaseUrl}/subject`;
        return this.http.post(url, payload);
    }

    public updateSubject(payload) {
        const url = `${this.courseBaseUrl}/subject`;
        return this.http.put(url, payload);
    }

    public saveChapter(payload) {
        const url = `${this.courseBaseUrl}/chapter`;
        return this.http.post(url, payload);
    }

    public updateChapter(payload) {
        const url = `${this.courseBaseUrl}/chapter`;
        return this.http.put(url, payload);
    }

    public getChapterDetails(chapterId) {
        const url = `${this.courseBaseUrl}/chapter/${chapterId}`;
        return this.http.get(url);
    }

    public getTopicDetails(topicId) {
        const url = `${this.courseBaseUrl}/topic/${topicId}`;
        return this.http.get(url);
    }

    public updateTopic(payload) {
        const url = `${this.courseBaseUrl}/topic`;
        return this.http.put(url, payload);
    }
    
    

    
}
