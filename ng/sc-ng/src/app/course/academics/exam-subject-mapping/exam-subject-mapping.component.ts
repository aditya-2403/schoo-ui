import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DragAndDropComponent } from '../../../shared/drag-and-drop/drag-and-drop.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AcademicsService} from '../academics.services';
import { MatOption } from '@angular/material/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-exam-subject-mapping',
  templateUrl: './exam-subject-mapping.component.html',
  styleUrls: ['./exam-subject-mapping.component.scss']
})
export class ExamSubjectMappingComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private academicsService: AcademicsService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  public unAssignExamSubjectList = [];
  public assignExamSubjectList = [];
  public SubjectMappingForm: FormGroup;
  public courseListData = [];
  public subjectDragableLimit: number;
  private orgId;
  private examId;
  private courseId;

  @ViewChild(DragAndDropComponent) public dragDropComponent: DragAndDropComponent;

  ngOnInit(): void {
    this.SubjectMappingForm = this.fb.group({
      courseListDropdown: ['', Validators.required]
    });
    this.route.params.subscribe((params: Params) => {
      //this.orgId = params['orgId'];
      this.examId = params['examId'];
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
    this.getMapAndUnmapListData();
  }

  public updateMapping() {
    const payload = this.createPayload();
  
    this.academicsService.mapSubjectToExam(this.examId, payload).subscribe(data => {
      const snackBarRef = this.snackBar.open(data['message'], 'Close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      snackBarRef.afterDismissed().subscribe(() => {
        this.router.navigate(['/sc/course/academics/exam/manage']);
      });
    });

  }

  createPayload() {
    const assignSubject = this.dragDropComponent.updatedTargetList;
    const assignSubjectList = [];
    for (const value of assignSubject) {
      const temp =  {
        "isActive": value.isActive || 0,
        "mapId": value.courseSubjectMapID
      }
      assignSubjectList.push(temp);
    }
    return assignSubjectList;
  }


  private getCourseList() {
    this.academicsService.getCourse()
      .subscribe(data => {
        this.courseListData = data['data'];
      });
  }

  private getMapAndUnmapListData() {
    const unmapSubject = this.academicsService.getUnAssignSubjectToExam(this.courseId, this.examId);
    const mapSubject = this.academicsService.getAssignSubjectToExam(this.examId);
    forkJoin([unmapSubject, mapSubject]).subscribe(data => {
      this.unAssignExamSubjectList = data[0]['data'];
      this.assignExamSubjectList = data[1]['data'] ? data[1]['data'] : [];
    });
  }

}
