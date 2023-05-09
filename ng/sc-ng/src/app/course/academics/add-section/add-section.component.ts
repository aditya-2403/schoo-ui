import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AcademicsService } from '../academics.services';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.scss']
})
export class AddSectionComponent implements OnInit {

  public addSectionForm: FormGroup;
  constructor(private fb: FormBuilder, 
    private academicsService: AcademicsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Inililize form
   */
  private initForm() {
    this.addSectionForm = this.fb.group({
      sectionName: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

   /**
   * add section
   */
  public addSection() {
    if (this.addSectionForm.valid) {
      const payload = this.createPayload();
      console.log(payload);
      this.academicsService.saveSection(payload).subscribe(data => {
        let snackBarRef = this.snackBar.open(data['message'], 'Close', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        snackBarRef.afterDismissed().subscribe(() => {
          this.router.navigate(['/sc/course/academics/section/manage']);
        });
      });

    }
  }

  private createPayload() {
    const formData = this.addSectionForm.value;
    const reqPayload = {
      courseID: formData.courseDropdown.courseID,
      courseName: formData.courseDropdown.courseName,
      orgID: formData.orgDropdown.orgID,
      orgName: formData.orgDropdown.orgname,
      sectionName: formData.sectionName
    };

    return reqPayload;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addSectionForm.controls[controlName].hasError(errorName);
  }

}
