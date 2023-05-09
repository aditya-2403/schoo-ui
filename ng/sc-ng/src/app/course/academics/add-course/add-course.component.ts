import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AcademicsService } from '../academics.services';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  public Editor = DecoupledEditor;
  @ViewChild('editor') editorComponent: CKEditorComponent;
  public addCourseForm: FormGroup;
  public courseIcon;
  public courseId;
  public courseIconUrl;

  constructor(
    private fb: FormBuilder, 
    private academicsService: AcademicsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.courseId = params['id'];
      if(this.courseId) 
          this.getCourseDetails();
    });
    this.initForm();
  }

   /**
   * Inililize form
   */
  private initForm() {
    this.addCourseForm = this.fb.group({
      courseName: ['', [Validators.required, Validators.maxLength(200)]],
      courseCode: ['', [Validators.required, Validators.maxLength(10)]],
      isApproved: ['']
    });
  }

  /**
   * Add Course
   */
  public addCourse() {
    if (this.addCourseForm.valid) {
      const payload = this.createPayload();
      console.log(payload);
      if(!this.courseId){ 
        this.academicsService.saveCourse(payload).subscribe(data => {
          this.saveUpdateCourseSuccessHander(data['message']);
        });
      }else{
        payload['courseID'] = this.courseId;
        this.academicsService.updateCourse(payload).subscribe(data => {
          this.saveUpdateCourseSuccessHander(data['message']);
        });
      }

    }
  }

  /**
   * Success Handler
   * @param {String} successMessage 
   */
  saveUpdateCourseSuccessHander(successMessage){
    let snackBarRef = this.snackBar.open(successMessage, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    snackBarRef.afterDismissed().subscribe(() => {
      this.router.navigate(['/sc/course/academics/course/manage']);
    });
  }

  private createPayload() {
    const formData = this.addCourseForm.value;
    const reqPayload = {
      courseName: formData.courseName,
      courseCode: formData.courseCode,
      courseContent: this.getEditor(),
      courseIcon: this.courseIcon,
      publish: formData.isApproved ? 1 : 0,
    };

    return reqPayload;
  }

  
   /**
   * Get Course Details
   */
  private getCourseDetails() {
    let courseId = this.courseId;
    this.academicsService.getCourseDetails(courseId).subscribe(data => {
      const courseDetails = data['data'];
      this.setCourseFormData(courseDetails)
    });
  }

  /**
   * Set Course data after edit
   * @param {Object} courseDetails 
   */
  private setCourseFormData(courseDetails) {
    const courseData = courseDetails;
    this.addCourseForm.patchValue({
      courseName: courseData.courseName,
      courseCode: courseData.courseCode,
      isApproved: +(courseData.publish)
    });

    this.editorComponent.editorInstance.setData(courseData['courseContent'])
    this.courseIcon = courseData['courseIcon'];
    this.courseIconUrl = courseData['signedUrl'];
 }

  onFileComplete(fileUploadResult: any) {
    this.courseIcon = fileUploadResult.data.s3path;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addCourseForm.controls[controlName].hasError(errorName);
  }

  /**
   * Initilize CKE Word Editor
   * @param editor 
   */
  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  /**
  * Return Editor Data
  * @param editor 
  */
  public getEditor() {
    // Warning: This may return "undefined" if the editor is hidden behind the `*ngIf` directive or
    // if the editor is not fully initialised yet.
    var editorData = this.editorComponent.editorInstance.getData();
    return editorData;
  }

}
