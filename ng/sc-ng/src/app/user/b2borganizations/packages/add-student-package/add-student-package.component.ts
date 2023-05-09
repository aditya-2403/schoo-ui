import { Component, OnInit, ViewChild } from '@angular/core';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { B2bOrganizationService } from '../../b2borganizations.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-student-package',
  templateUrl: './add-student-package.component.html',
  styleUrls: ['./add-student-package.component.scss']
})
export class AddStudentPackageComponent implements OnInit {
  public Editor = DecoupledEditor;
  @ViewChild('editor') editorComponent: CKEditorComponent;
  public studPackageForm: FormGroup;
  public packageDescription = '';

  constructor(private fb: FormBuilder,
    private b2bOrgService: B2bOrganizationService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  /**
  * Inililize Assing Package form
  */
  private initForm() {
    this.studPackageForm = this.fb.group({
      learningMode: ['Self', Validators.required],
      packageName: ['', [Validators.required, Validators.maxLength(200)]],
      packageGoal: ['', [Validators.required, Validators.maxLength(200)]],
      packageFees: ['', [Validators.required, Validators.maxLength(10)]],
      packageDescription: ['']
    });
  }

  /* Handle form errors in Angular 8 */
  public errorHandling = (control: string, error: string) => {
    return this.studPackageForm.controls[control].hasError(error);
  }

  /**
   * Add/Edit Org package Submit Button Event
   */
  public submitFormData() {
    if (this.studPackageForm.valid) {
      const payload = this.createPayload();
      console.log(payload);
      this.b2bOrgService.saveStudPackage(payload).subscribe(data => {
        let snackBarRef = this.snackBar.open(data['message'], 'Close', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        snackBarRef.afterDismissed().subscribe(() => {
          this.router.navigate(['/sc/user/b2borganisation/student-package/manage']);
        });
      });

    }
  }

  private createPayload() {
    const formData = this.studPackageForm.value;
    const reqPayload = {
      courseID: formData.courseDropdown.courseID,
      courseName: formData.courseDropdown.courseName,
      orgID: formData.orgDropdown.orgID,
      orgName: formData.orgDropdown.orgname,
      packageName: formData.packageName,
      packageGoal: formData.packageGoal,
      packageFees: formData.packageFees,
      packageDescription: this.getEditor()
    };

    return reqPayload;
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
