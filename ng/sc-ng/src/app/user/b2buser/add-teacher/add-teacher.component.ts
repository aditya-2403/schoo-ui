import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { B2buserService } from '../b2buser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit {

  public addTeacherForm: FormGroup;
  public teacherPhoto;
  public organizationList =  [];
  constructor(
    private fb: FormBuilder, 
    private b2buserService: B2buserService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.getOrgListData();
  }

  private getOrgListData() {
    this.b2buserService.getOrganizations().subscribe(data => {
      this.organizationList =  data['data'];
    });
  }

   /**
   * Inililize form
   */
  private initForm() {
    this.addTeacherForm = this.fb.group({
      teacherName: ['', Validators.required],
      orgID: ['', Validators.required],
      teacherQualification: ['', Validators.required],
      teacherMobile: ['', Validators.required],
      teacherEmail: ['', Validators.required],
      gender: ['Male', Validators.required],
      isApproved: ['']
    });
  }

  /**
   * Add teacher
   */
  public addTeacher() {
    if (this.addTeacherForm.valid) {
      const payload = this.createPayload();
      console.log(payload);
      this.b2buserService.saveTeacher(payload).subscribe(data => {
        let snackBarRef = this.snackBar.open(data['message'], 'Close', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        snackBarRef.afterDismissed().subscribe(() => {
          this.router.navigate(['sc/user/b2buser/teacher/manage']);
        });
      });

    }
  }

  private createPayload() {
    const formData = this.addTeacherForm.value;
  
    const reqPayload = {
      orgID: formData.orgID,
      teacherName: formData.teacherName,
      teacherQualification: formData.teacherQualification,
      teacherMobile: formData.teacherMobile,
      teacherEmail: formData.teacherEmail,
      gender: formData.gender,
      isApproved: formData.isApproved ? 1 : 0,
      teacherPhoto: this.teacherPhoto
      //creationMode: "Excel Upload - Admin"
    };

    return reqPayload;
  }

  onFileComplete(fileUploadResult: any) {
    this.teacherPhoto = fileUploadResult.data.s3path;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addTeacherForm.controls[controlName].hasError(errorName);
  }

}
