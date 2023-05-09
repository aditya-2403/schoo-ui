import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { B2buserService } from '../b2buser.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-upload-bulk-student',
  templateUrl: './upload-bulk-student.component.html',
  styleUrls: ['./upload-bulk-student.component.scss']
})
export class UploadBulkStudentComponent implements OnInit {
  public bulkUploadStudentForm: FormGroup;
  constructor( private fb: FormBuilder, 
    private b2buserService: B2buserService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.bulkUploadStudentForm = this.fb.group({
     
    });
  }

  /**
   * Add Student
   */
  public addStudents() {
    if (this.bulkUploadStudentForm.valid) {

    }
  }

  onFileComplete(fileUploadResult: any) {
    
  }

}
