import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AcademicsService } from '../academics.services';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-topic',
  templateUrl: './edit-topic.component.html',
  styleUrls: ['./edit-topic.component.scss']
})
export class EditTopicComponent implements OnInit {

  public editTopicForm: FormGroup;
  public topicId;
  private topicDetails;
  constructor(
    private fb: FormBuilder, 
    private academicsService: AcademicsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.topicId = params['id'];
      if(this.topicId) 
          this.getTopicDetails();
    });
    this.initForm();
  }

   /**
   * Inililize form
   */
  private initForm() {
    this.editTopicForm = this.fb.group({
      topicName: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  /**
   * Edit Topic
   */
  public submitData() {
    if (this.editTopicForm.valid) {
      const payload = this.createPayload();  
      this.academicsService.updateTopic(payload).subscribe(data => {
        let snackBarRef = this.snackBar.open(data['message'], 'Close', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        snackBarRef.afterDismissed().subscribe(() => {
          this.router.navigate(['/sc/course/academics/topic/manage']);
        });
      });
    }
  }

  private createPayload() {
    const formData = this.editTopicForm.value;
    this.topicDetails['topicName'] = formData.topicName;
    var reqPayload = this.topicDetails;
    return reqPayload;
  }

  
   /**
   * Get Topic Details
   */
  private getTopicDetails() {
    let topicId = this.topicId;
    this.academicsService.getTopicDetails(topicId).subscribe(data => {
      const topicDetails = data['data'];
      this.topicDetails = topicDetails;
      this.setTopicFormData(topicDetails)
    });
  }

  /**
   * Set Topic data after edit
   * @param {Object} topicDetails 
   */
  private setTopicFormData(topicDetails) {
    const topicData = topicDetails;
    this.editTopicForm.patchValue({
      topicName: topicData.topicName,
    });
 }


  public hasError = (controlName: string, errorName: string) => {
    return this.editTopicForm.controls[controlName].hasError(errorName);
  }

}
