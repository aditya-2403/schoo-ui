import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { B2bOrganizationService } from '../b2borganizations.service';

import { HelperService } from '../../../shared/help.service';


@Component({
  selector: 'start-add-session',
  templateUrl: './start-session.component.html',
  styleUrls: ['./start-session.component.scss']
})
export class StartSessionComponent implements OnInit {

  constructor(private fb: FormBuilder, 
    private helperService: HelperService,
    private b2bOrgService: B2bOrganizationService,
    private snackBar: MatSnackBar,
    private router: Router) { }
  public startSessionForm: FormGroup;
  public minDate = new Date();

  ngOnInit(): void {
    this.startSessionForm = this.fb.group({
      sessionStartDate: [, Validators.required],
      sessionEndDate: [, Validators.required]
    });
  }
  /* Handle form errors in Angular 8 */
  public errorHandling = (control: string, error: string) => {
    return this.startSessionForm.controls[control].hasError(error);
  }

  public submitSession() {
    var payload = this.createPayload();
    console.log('start session -->', payload);
    this.b2bOrgService.startSession(payload).subscribe(data => {
      let snackBarRef = this.snackBar.open(data['message'], 'Close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      snackBarRef.afterDismissed().subscribe(() => {
        this.router.navigate(['/sc/user/b2borganisation/session/manage']);
      });
    });
  }

  private createPayload() {
    const formData = this.startSessionForm.value;
    formData.sessionStartDate = this.helperService.getDateFormat(formData.sessionStartDate); // TODO: need to change
    formData.sessionEndDate = this.helperService.getDateFormat(formData.sessionEndDate); // TODO: need to change
    const sessionYear = ""+this.helperService.getFullYear(formData.sessionStartDate)
    const reqPayload = {
      courseID: formData.courseDropdown.courseID,
      courseName: formData.courseDropdown.courseName,
      orgID: formData.orgDropdown.orgID,
      orgName: formData.orgDropdown.orgname,
      startDate: formData.sessionStartDate,
      endDate: formData.sessionEndDate,
      sessionYear: sessionYear
    };

    return reqPayload;
  }
}

