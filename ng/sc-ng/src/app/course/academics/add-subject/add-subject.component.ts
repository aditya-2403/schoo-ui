import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AcademicsService } from '../academics.services';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit {

  public Editor = DecoupledEditor;
  @ViewChild('editor') editorComponent: CKEditorComponent;
  public addSubjectForm: FormGroup;
  public subjectIcon;
  public subjectId;
  public subjectIconUrl;
 
  constructor(
    private fb: FormBuilder, 
    private academicsService: AcademicsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.subjectId = params['id'];
      if(this.subjectId) 
          this.getSubjectDetails();
    });
    this.initForm();
  }

   /**
   * Inililize form
   */
  private initForm() {
    this.addSubjectForm = this.fb.group({
      subjectName: ['', [Validators.required, Validators.maxLength(200)]],
      subjectCode: ['', [Validators.required, Validators.maxLength(10)]]
    });
  }

  /**
   * Add Subject
   */
  public addSubject() {
    if (this.addSubjectForm.valid) {
      const payload = this.createPayload();
      console.log(payload);
      if(!this.subjectId){ 
        this.academicsService.saveSubject(payload).subscribe(data => {
          this.saveUpdateSubjectSuccessHander(data['message']);
        });
      }else{
        payload['subjectID'] = this.subjectId;
        this.academicsService.updateSubject(payload).subscribe(data => {
          this.saveUpdateSubjectSuccessHander(data['message']);
        });
      }

    }
  }

  /**
   * Success Handler
   * @param {String} successMessage 
   */
  saveUpdateSubjectSuccessHander(successMessage){
    let snackBarRef = this.snackBar.open(successMessage, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    snackBarRef.afterDismissed().subscribe(() => {
      this.router.navigate(['/sc/course/academics/subject/manage']);
    });
  }

  private createPayload() {
    const formData = this.addSubjectForm.value;
    const reqPayload = {
      subjectName: formData.subjectName,
      subjectCode: formData.subjectCode,
      subjectContent: this.getEditor(),
      subjectIcon: this.subjectIcon
    };

    return reqPayload;
  }

  
   /**
   * Get Subject Details
   */
  private getSubjectDetails() {
    let subjectId = this.subjectId;
    this.academicsService.getSubjectDetails(subjectId).subscribe(data => {
      const subjectDetails = data['data'];
      this.setSubjectFormData(subjectDetails)
    });
  }

  /**
   * Set Subject data after edit
   * @param {Object} subjectDetails 
   */
  private setSubjectFormData(subjectDetails) {
    const subjectData = subjectDetails;
    this.addSubjectForm.patchValue({
      subjectName: subjectData.subjectName,
      subjectCode: subjectData.subjectCode,
      isApproved: +(subjectData.publish)
    });

    this.editorComponent.editorInstance.setData(subjectData['subjectContent'])
    this.subjectIcon = subjectData['subjectIcon'];
    this.subjectIconUrl = subjectData['signedUrl'];
 }

  onFileComplete(fileUploadResult: any) {
    this.subjectIcon = fileUploadResult.data.s3path;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addSubjectForm.controls[controlName].hasError(errorName);
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
