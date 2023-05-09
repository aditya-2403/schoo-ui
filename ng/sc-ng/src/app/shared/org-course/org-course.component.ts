import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-org-course',
  templateUrl: './org-course.component.html',
  styleUrls: ['./org-course.component.scss']
})
export class OrgCourseComponent implements OnInit {

  constructor(private http: HttpClient, private appservice: AppService) { }
  private baseUrl = this.appservice.userBaseURL;
  private courseBaseUrl = this.appservice.courseBaseURL;
  public organizationList = [];
  public courseList = [];
  public sectionList = [];
  @Input() public parentForm: FormGroup;
  @Input() public isRequiredOrgField = true;
  @Input() public isRequiredCourseField = true;
  @Input() public isRequiredSectionField = true;
  @Input() public isSection = false;
  @Output() public getCourseDetails = new EventEmitter<any>();
  @Output() public getSectionDetails = new EventEmitter<any>();
  ngOnInit(): void {
    this.updateControlForm();
    this.getOrgListData();
  }

  public changeOrganication(event) {
    const orgId = event.value.orgID;
    if (!this.isSection) {
      this.getCourseListData(orgId);
    } else {
      this.getSectionListData(orgId);
    }
  }

  public changeCourse(event) {
    const courseData = event.value;
    this.getCourseDetails.emit(courseData);
  }

  public changeSection(event) {
    const sectionList = event.value;
    this.getSectionDetails.emit(sectionList);
  }

  private updateControlForm() {
    this.parentForm.addControl('orgDropdown', new FormControl());
    if (!this.isSection) {
      this.parentForm.addControl('courseDropdown', new FormControl());
    } else {
      this.parentForm.addControl('sectionDropdown', new FormControl());
    }



    if (this.isRequiredOrgField) {
      this.parentForm.controls['orgDropdown'].setValidators(Validators.required);
    }
    if (this.isRequiredCourseField && !this.isSection) {
      this.parentForm.controls['courseDropdown'].setValidators(Validators.required);
    }
    if (this.isRequiredSectionField && this.isSection) {
      this.parentForm.controls['sectionDropdown'].setValidators(Validators.required);
    }
  }

  private getOrgListData() {
    this.http.get(`${this.baseUrl}/organizations`).subscribe(data => {
      console.log('get org data ->', data);
      this.organizationList = data['data'];
    });
  }

  private getCourseListData(orgId) {
    this.http.get(`${this.courseBaseUrl}/course/organization/${orgId}`).subscribe(data => {
      this.courseList = data['data'];
    });
  }

  private getSectionListData(orgId) {
    this.http.get(`${this.courseBaseUrl}/course/organization/section/${orgId}`).subscribe(data => {
      this.sectionList = data['data'];
    });
  }

}
