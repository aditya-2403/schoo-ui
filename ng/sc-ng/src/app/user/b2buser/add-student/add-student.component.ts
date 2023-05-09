import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { B2buserService } from '../b2buser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  public addStudentForm: FormGroup;
  public studentPhoto;
  constructor(
    private fb: FormBuilder, 
    private b2buserService: B2buserService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

   /**
   * Inililize form
   */
  private initForm() {
    this.addStudentForm = this.fb.group({
      studentName: ['', Validators.required],
      fathersName: ['', Validators.required],
      studentMobile: ['', Validators.required],
      studentEmail: ['', Validators.required],
      gender: ['Male', Validators.required],
      isApproved: ['']
    });
  }

  /**
   * Add Student
   */
  public addStudent() {
    if (this.addStudentForm.valid) {
      const payload = this.createPayload();
      console.log(payload);
      this.b2buserService.saveStudent(payload).subscribe(data => {
        let snackBarRef = this.snackBar.open(data['message'], 'Close', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        snackBarRef.afterDismissed().subscribe(() => {
          this.router.navigate(['sc/user/b2buser/student/manage']);
        });
      });

    }
  }

  private createPayload() {
    const formData = this.addStudentForm.value;
    const reqPayload = {
      sectionID: formData.sectionDropdown.sectionID,
      sectionName: formData.sectionDropdown.sectionName,
      orgID: formData.orgDropdown.orgID,
      orgName: formData.orgDropdown.orgname,
      studentName: formData.studentName,
      fathersName: formData.fathersName,
      studentMobile: formData.studentMobile,
      studentEmail: formData.studentEmail,
      gender: formData.gender,
      isApproved: formData.isApproved ? 1 : 0,
      studentPhoto: this.studentPhoto,
      creationMode: "Excel Upload - Admin"
    };

    return reqPayload;
  }

  onFileComplete(fileUploadResult: any) {
    this.studentPhoto = fileUploadResult.data.s3path;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addStudentForm.controls[controlName].hasError(errorName);
  }

}
