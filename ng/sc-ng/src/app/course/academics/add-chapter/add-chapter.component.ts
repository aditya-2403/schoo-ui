import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AcademicsService } from '../academics.services';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add-chapter',
  templateUrl: './add-chapter.component.html',
  styleUrls: ['./add-chapter.component.scss']
})
export class AddChapterComponent implements OnInit {
  public courseList = [];
  public subjectList = [];
  public courseName;
  public subjectName;
  public Editor = DecoupledEditor;
  @ViewChild('editor') editorComponent: CKEditorComponent;
  public addChapterForm: FormGroup;
  public chapterId;
 
  constructor(
    private fb: FormBuilder, 
    private academicsService: AcademicsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getCourseListData();
   
    this.route.params.subscribe((params: Params) => {
      this.chapterId = params['id'];
      if(this.chapterId) 
          this.getChapterDetails();
    });
    this.initForm();
  }

   /**
   * Inililize form
   */
  private initForm() {
    this.addChapterForm = this.fb.group({
      courseId: ['', Validators.required],
      subjectId: ['', Validators.required],
      chapterName: ['', [Validators.required, Validators.maxLength(200)]],
      chapterNumber: ['', [Validators.required, Validators.maxLength(10)]],
      chapterDescription: ''
    });
  }

  getCourseListData(){
    this.academicsService.getCourse().subscribe(data => {
      this.courseList = data['data'];
    });
  }
  
  public changeCourse(event) {
    const courseID = event.value;
    this.getSubjectListData(courseID);
  }
  private getSubjectListData(courseId) {
    this.academicsService.getSubjectbyCourseId(courseId).subscribe(data => {
      this.subjectList = data['data'];
    });
  }
  


  /**
   * Add Chapter
   */
  public addChapter() {
    if (this.addChapterForm.valid) {
      const payload = this.createPayload();
      console.log(payload);
      if(!this.chapterId){ 
        this.academicsService.saveChapter(payload).subscribe(data => {
          this.saveUpdateChapterSuccessHander(data['message']);
        });
      }else{
        payload['chapterID'] = this.chapterId;
        this.academicsService.updateChapter(payload).subscribe(data => {
          this.saveUpdateChapterSuccessHander(data['message']);
        });
      }

    }
  }

  /**
   * Success Handler
   * @param {String} successMessage 
   */
  saveUpdateChapterSuccessHander(successMessage){
    let snackBarRef = this.snackBar.open(successMessage, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    snackBarRef.afterDismissed().subscribe(() => {
      this.router.navigate(['/sc/course/academics/chapter/manage']);
    });
  }

  private createPayload() {
    const formData = this.addChapterForm.value;
    const reqPayload = {
      courseID: formData.courseId,
      subjectID: formData.subjectId,
      chapterName: formData.chapterName,
      chapterNumber: formData.chapterNumber,
      chapterDescription: this.getEditor()
    };

    return reqPayload;
  }

  
   /**
   * Get Chapter Details
   */
  private getChapterDetails() {
    let chapterId = this.chapterId;
    this.academicsService.getChapterDetails(chapterId).subscribe(data => {
      const chapterDetails = data['data'];
      this.setChapterFormData(chapterDetails)
    });
  }

  /**
   * Set Chapter data after edit
   * @param {Object} chapterDetails 
   */
  private setChapterFormData(chapterDetails) {
    const chapterData = chapterDetails;
    this.addChapterForm.patchValue({
      courseId: chapterData.courseID,
      subjectId: chapterData.subjectID,
      chapterName: chapterData.chapterName,
      chapterNumber: chapterData.chapterNumber
    });

    this.editorComponent.editorInstance.setData(chapterData['chapterDescription'])
   
 }


  public errorHandling = (controlName: string, errorName: string) => {
    return this.addChapterForm.controls[controlName].hasError(errorName);
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
