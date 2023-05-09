import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DragAndDropComponent } from '../../../shared/drag-and-drop/drag-and-drop.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { B2buserService } from '../b2buser.service';
import { MatOption } from '@angular/material/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-subject-mapping',
  templateUrl: './subject-mapping.component.html',
  styleUrls: ['./subject-mapping.component.scss']
})
export class SubjectMappingComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private b2UserService: B2buserService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  public unAssignTeacherSubjectList = [];
  public assignTeacherSubjectList = [];
  public SubjectMappingForm: FormGroup;
  public courseListData = [];
  public sectionListData = [];
  public subjectDragableLimit: number;
  public teacherName = '';
  public orgName = '';
  private orgId;
  private teacherId;
  private sectionId;
  private courseId;

  @ViewChild(DragAndDropComponent) public dragDropComponent: DragAndDropComponent;

  ngOnInit(): void {
    this.SubjectMappingForm = this.fb.group({
      courseListDropdown: ['', Validators.required],
      sectionListDropdown: ['', Validators.required],
      isClassTeacher: [false, Validators.required]
    });
    this.route.params.subscribe((params: Params) => {
      this.orgId = params.orgId;
      this.teacherId = params.tchrId;
      this.teacherName = params.teacherName;
      this.orgName = params.orgName;
      this.getCourseList();
    });
  }

  /* Handle form errors in Angular 8 */
  public errorHandling = (control: string, error: string) => {
    return this.SubjectMappingForm.controls[control].hasError(error);
  }

  public changeCourse(event: MatOption): void {
    const selectCourse = event.value;
    this.courseId = selectCourse.courseID;
     this.getSectionList();
  }

  public getSectionList(): void {
    this.b2UserService.getSectionList(this.orgId, this.courseId)
      .subscribe(data => {
        this.sectionListData = data['data'];
      });
  }

  public changeSection(event: MatOption): void {
    const selectCourse = event.value;
    this.sectionId = selectCourse.sectionID;
    this.getMapAndUnmapListData();
  }

  public updateMapping() {
    const payload = this.createPayload();
    const ids = {
      orgId: this.orgId,
      teacherId: this.teacherId,
      sectionId: this.sectionId,
      isClassTeacher: this.SubjectMappingForm.controls.isClassTeacher.value ? 1 : 0
    };
    this.b2UserService.mapSubjectToTeacher(ids, payload).subscribe(data => {
      const snackBarRef = this.snackBar.open(data['message'], 'Close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      snackBarRef.afterDismissed().subscribe(() => {
        this.router.navigate(['/b2buser/teacher/manage']);
      });
    });

  }

  createPayload() {
    const assignSubject = this.dragDropComponent.updatedTargetList;
    const assignSubjectList = [];
    for (const value of assignSubject) {
      assignSubjectList.push(value.subjectId);
    }
    return assignSubjectList;
  }


  private getCourseList() {
    this.b2UserService.getCourseList(this.orgId)
      .subscribe(data => {
        this.courseListData = data['data'];
      });
  }

  private getMapAndUnmapListData() {
    const unmapSubject = this.b2UserService.getUnAssignSubjectToTeacher(this.orgId, this.teacherId, this.courseId, this.sectionId);
    const mapSubject = this.b2UserService.getAssignSubjectToTeacher(this.orgId, this.teacherId, this.courseId, this.sectionId);
    forkJoin([unmapSubject, mapSubject]).subscribe(data => {
      this.unAssignTeacherSubjectList = data[0]['data'];
      this.assignTeacherSubjectList = data[1]['data'] ? data[1]['data'] : [];
    });
  }



}
