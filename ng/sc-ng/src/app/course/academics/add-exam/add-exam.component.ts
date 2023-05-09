import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AcademicsService } from '../academics.services';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.scss']
})
export class AddExamComponent implements OnInit {

  public addExamForm: FormGroup;
  public examIcon;
  public examId;
  public examIconUrl;
  constructor(
    private fb: FormBuilder, 
    private academicsService: AcademicsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.examId = params['id'];
      if(this.examId) 
          this.getExamDetails();
    });
    this.initForm();
  }

   /**
   * Inililize form
   */
  private initForm() {
    this.addExamForm = this.fb.group({
      examName: ['', [Validators.required, Validators.maxLength(200)]],
      examCode: ['', [Validators.required, Validators.maxLength(100)]],
      examTotalMarks: ['', [Validators.required, Validators.maxLength(10)]],
      examTotalPapers: ['', [Validators.required, Validators.maxLength(10)]],
      examWebsite: ['', [Validators.required, Validators.maxLength(100)]],
      examMonth: ['', [Validators.required, Validators.maxLength(50)]],
      examNoOfSeats: ['', [Validators.required, Validators.maxLength(100)]],
      isApproved: ['']
    });
  }

  /**
   * Add Exam
   */
  public addExam() {
    if (this.addExamForm.valid) {
      const payload = this.createPayload();
      console.log(payload);
      if(!this.examId){ 
        this.academicsService.saveExam(payload).subscribe(data => {
          this.saveUpdateExamSuccessHander(data['message']);
        });
      }else{
        payload['examID'] = this.examId;
        this.academicsService.updateExam(payload).subscribe(data => {
          this.saveUpdateExamSuccessHander(data['message']);
        });
      }

    }
  }

  /**
   * Success Handler
   * @param {String} successMessage 
   */
  saveUpdateExamSuccessHander(successMessage){
    let snackBarRef = this.snackBar.open(successMessage, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    snackBarRef.afterDismissed().subscribe(() => {
      this.router.navigate(['/sc/course/academics/exam/manage']);
    });
  }

  private createPayload() {
    const formData = this.addExamForm.value;
    const reqPayload = {
      examName: formData.examName,
      examCode: formData.examCode,
      examMarks: formData.examTotalMarks,
      examNumPapers: formData.examTotalPapers,
      examWebsite: formData.examWebsite,
      examMonth: formData.examMonth,
      examSeats: formData.examNoOfSeats,
      examIcon: this.examIcon,
      publish: formData.isApproved ? 1 : 0,
    };

    return reqPayload;
  }

  
   /**
   * Get Exam Details
   */
  private getExamDetails() {
    let examId = this.examId;
    this.academicsService.getExamDetails(examId).subscribe(data => {
      const examDetails = data['data'];
      this.setExamFormData(examDetails)
    });
  }

  /**
   * Set Exam data after edit
   * @param {Object} examDetails 
   */
  private setExamFormData(examDetails) {
    const examData = examDetails;
    this.addExamForm.patchValue({
      examName: examData.examName,
      examCode: examData.examCode,
      examTotalMarks: examData.examMarks,
      examTotalPapers: examData.examNumPapers,
      examWebsite: examData.examWebsite,
      examMonth: examData.examMonth,
      examNoOfSeats: examData.examSeats,
      isApproved: +(examData.publish),
      examIcon: examData.examIcon
    });
    this.examIcon = examData['examIcon'];
    this.examIconUrl = examData['signedUrl'];
 }

  onFileComplete(fileUploadResult: any) {
    this.examIcon = fileUploadResult.data.s3path;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addExamForm.controls[controlName].hasError(errorName);
  }

}
