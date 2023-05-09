import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DragAndDropComponent } from '../../../shared/drag-and-drop/drag-and-drop.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AcademicsService} from '../academics.services';
import { MatOption } from '@angular/material/core';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-course-subject-mapping',
  templateUrl: './course-subject-mapping.component.html',
  styleUrls: ['./course-subject-mapping.component.scss']
})
export class CourseSubjectMappingComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private academicsService: AcademicsService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  public unAssignCourseSubjectList = [];
  public assignCourseSubjectList = [];
  public SubjectMappingForm: FormGroup;
  public subjectDragableLimit: number;
  public couseData;
  private courseId;
  public courseName;

  @ViewChild(DragAndDropComponent) public dragDropComponent: DragAndDropComponent;

  ngOnInit(): void {
    
    this.route.params.subscribe((params: Params) => {
      //this.orgId = params['orgId'];
      this.courseId = params['courseId'];
      this.getCourseDetails()
      this.getMapAndUnmapListData();
    });
  }

  public getCourseDetails(){
    const courseId = this.courseId;
    this.academicsService.getCouseDetails(courseId).subscribe(data => {
      this.couseData = data['data'];
      this.courseName = data['data']['courseName'];
    });

  }

  /* Handle form errors in Angular 8 */
  public errorHandling = (control: string, error: string) => {
    return this.SubjectMappingForm.controls[control].hasError(error);
  }


  public updateMapping() {
    const payload = this.createPayload();
  
    this.academicsService.mapSubjectToCourse(this.courseId, payload).subscribe(data => {
      const snackBarRef = this.snackBar.open(data['message'], 'Close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      snackBarRef.afterDismissed().subscribe(() => {
        this.router.navigate(['/sc/course/academics/course/manage']);
      });
    });

  }

  createPayload() {
    const assignSubject = this.dragDropComponent.updatedTargetList;
    const assignSubjectList = [];
    for (const value of assignSubject) {
      const temp =  {
        "isActive": value.isActive || 0,
        "mapId": value.subjectID
      }
      assignSubjectList.push(temp);
    }
    return assignSubjectList;
  }



  private getMapAndUnmapListData() {
    const unmapSubject = this.academicsService.getUnAssignSubjectToCourse(this.courseId);
    const mapSubject = this.academicsService.getAssignSubjectToCourse(this.courseId);
    forkJoin([unmapSubject, mapSubject]).subscribe(data => {
      this.unAssignCourseSubjectList = data[0]['data'];
      this.assignCourseSubjectList = data[1]['data'] ? data[1]['data'] : [];
    });
  }
}
