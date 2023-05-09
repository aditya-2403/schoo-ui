import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router  } from '@angular/router';
import { B2bOrganizationService } from '../../b2borganizations.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { DragAndDropComponent } from '../../../../shared/drag-and-drop/drag-and-drop.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-mapping',
  templateUrl: './course-mapping.component.html',
  styleUrls: ['./course-mapping.component.scss']
})
export class CourseMappingComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private b2cOrgService: B2bOrganizationService,
    private snackBar: MatSnackBar,
    private router: Router,) { }

  public orgName = '';
  public planName = '';
  public limts = 'Courses= , Subjects = ';
  public notMappedSubjectList = [];
  public mappedSubjectList = [];
  public CourseMappingForm: FormGroup;
  public courseListData = [];
  public subjectDragableLimit: number;
  private orgId;
  private courseId;
  private pkgDetails;

  @ViewChild(DragAndDropComponent) public dragDropComponent: DragAndDropComponent;

  ngOnInit(): void {
    this.CourseMappingForm = new FormGroup({
      courseListDropdown: new FormControl('', Validators.required)
    });
    this.route.params.subscribe((params: Params) => {
      this.orgId = params['id'];
      this.orgName = params['orgName'] || '';
      this.getPkgDetails();
    });
  }

  /* Handle form errors in Angular 8 */
  public errorHandling = (control: string, error: string) => {
    return this.CourseMappingForm.controls[control].hasError(error);
  }

  public changeCourse(event) {
    const selectCourse = event.value;
    this.courseId = selectCourse.courseID;
    this.getMapAndUnmapListData(selectCourse.courseID);
  }

  public updateMapping() {
    const payload = this.createPayload();
    // console.log(this.orgId)
    // console.log(this.courseId)
    // console.log(payload)
    this.b2cOrgService.orgCourseMappingData(this.orgId, this.courseId, payload).subscribe(data => {
      let snackBarRef = this.snackBar.open(data['message'], 'Close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      snackBarRef.afterDismissed().subscribe(() => {
        this.router.navigate(['/sc/user//b2borganisation/manage']);
      });
    });

  }

  createPayload(){
    //const unmapData = this.dragDropComponent.updatedSourceList;
    const mapData = this.dragDropComponent.updatedTargetList;
    //console.log('print here unmapdata', unmapData, mapData);
    let mappedCourse = [];
    for (let value of mapData) {
      mappedCourse.push(value['courseSubjectMapID'])
    }
    return mappedCourse;
  }


  private getPkgDetails() {
    this.b2cOrgService.getAssignPackageData(this.orgId)
      .subscribe(data => {
        this.pkgDetails = data['data'];
        this.planName = this.pkgDetails.packageName || '';
        this.limts = `Courses = ${this.pkgDetails.numCourses || ''}  Subjects = ${this.pkgDetails.numSubject || ''}`;
        this.subjectDragableLimit = this.pkgDetails.numSubject || 0;
        this.getCourseList();
      });
  }

  private getCourseList() {
    this.b2cOrgService.getAllCourseList()
      .subscribe(data => {
        console.log('print here data', data);
        this.courseListData = data.data;
      });
  }

  private getMapAndUnmapListData(courseId) {
    const unmapSubject = this.b2cOrgService.getunMapSubjectExamList(this.orgId, courseId);
    const mapSubject = this.b2cOrgService.getMapSubjectList(this.orgId, courseId);
    forkJoin([unmapSubject, mapSubject]).subscribe(data => {
      this.notMappedSubjectList = data[0]['data'];
      this.mappedSubjectList = data[1]['data'];
    });
  }

   /**
   * Cancel Button click event
   */
  public cancelButtonEvent() {
    this.router.navigate(['/sc/user/b2borganisation/manage']);
  }

  
}
