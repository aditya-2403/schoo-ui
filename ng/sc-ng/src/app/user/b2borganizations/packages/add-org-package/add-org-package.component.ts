import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { B2bOrganizationService } from '../../b2borganizations.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
export interface Feature {
  name: string;
}

@Component({
  selector: 'app-add-org-package',
  templateUrl: './add-org-package.component.html',
  styleUrls: ['./add-org-package.component.scss']
})


export class AddOrgPackageComponent implements OnInit {

  public orgPackageForm: FormGroup;
  private orgPackageID;
  public orgPackageIcon = '';
  public editableOrgPkgData = [];
  public packageIconUrl;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  maxFeature = 15;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  features: Feature[] = [];

  constructor(private fb: FormBuilder,
    private b2bOrgService: B2bOrganizationService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router) { }

    ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
        this.orgPackageID = params['id'];
        if(this.orgPackageID) 
            this.getOrgPkgDetails();
      });
      this.initForm();
      
    }

    //Add Chip
    add(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;
  
      // Add our feature
      if ((value || '').trim() && this.features.length < this.maxFeature) {
        this.features.push({name: value.trim()});
      }
  
      // Reset the input value
      if (input) {
        input.value = '';
      }
    }
    //Remove Chip
    remove(feature: Feature): void {
      const index = this.features.indexOf(feature);
  
      if (index >= 0) {
        this.features.splice(index, 1);
      }
    }

   /**
   * Inililize Assing Package form
   */
  private initForm() {
    this.orgPackageForm = this.fb.group({
      orgPackageFor: ['', Validators.required],
      orgPackageName: ['', [Validators.required, Validators.maxLength(200)]],
      orgPackageNumSubjects: ['', Validators.required],
      orgPackageNumCourses: ['', Validators.required],
      orgPackageNumExams: ['', Validators.required],
      priceUpto500: ['', [Validators.required, Validators.maxLength(10)]],
      priceUpto1000: ['', [Validators.required, Validators.maxLength(10)]],
      priceUpto1500: ['', [Validators.required, Validators.maxLength(10)]],
      priceAfter1500: ['', [Validators.required, Validators.maxLength(10)]],
      orgPackagePriceComment: ['']
    });
  }
  
  /**
   * Add/Edit Org package Submit Button Event
   */
  public submitFormData() {
    if (this.orgPackageForm.valid) {
      let payload = this.orgPackageForm.value;
        payload['orgPackageIcon'] =  this.orgPackageIcon;
        payload = this.updateFeaturePayload(payload);
        if(!this.editableOrgPkgData['orgPackageID']){ 
          this.b2bOrgService.saveOrgPackage(payload).subscribe(data => {
            this.saveUpdateOrganizationSuccessHander(data['message']);
          }); 
        } else {
          payload['orgPackageID'] = this.editableOrgPkgData['orgPackageID'];
          this.b2bOrgService.updateOrgPackage(payload).subscribe(data => {
            this.saveUpdateOrganizationSuccessHander(data['message']);
          }); 
        }
    }
  }

  updateFeaturePayload(_payload){
    const payload = _payload;
    let key = 'orgPackageDetails';
    let featureLen = this.features.length;
    for(let i=0;i < featureLen;i++){
      let orgKey = key+(i+1)
      payload[orgKey] = this.features[i]['name'] || '';
    }
    return payload;
  }

  /**
   * Success Handler
   * @param {String} successMessage 
   */
  saveUpdateOrganizationSuccessHander(successMessage){
    let snackBarRef = this.snackBar.open(successMessage, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    snackBarRef.afterDismissed().subscribe(() => {
      this.router.navigate(['/sc/user/b2borganisation/org-package/manage']);
    });
  }



   /* Handle form errors in Angular 8 */
   public errorHandling = (control: string, error: string) => {
    return this.orgPackageForm.controls[control].hasError(error);
  }

  /**
   * Reset Form field value of Assign Package form
   */
  private resetForm() {
    this.orgPackageForm.reset();
  }


  /**
   * Cancel Button click event
   */
  public cancelButtonEvent() {
    this.router.navigate(['/sc/user/b2borganisation/org-package/manage']);
  }

   /**
   * Get Org Package Details
   */
  private getOrgPkgDetails() {
    let orgPackageID = this.orgPackageID;
    this.b2bOrgService.getOrgPkgDetails(orgPackageID).subscribe(data => {
      const orgPkgDetails = data['data'];
      this.editableOrgPkgData = orgPkgDetails;
      this.setOrgPkgFormData(orgPkgDetails)
    });
  }

  /**
   * Set Org Package data after edit
   * @param {Object} orgPkgDetails 
   */
  private setOrgPkgFormData(orgPkgDetails) {
    const orgPkgData = orgPkgDetails;
    this.orgPackageForm.patchValue({
      orgPackageFor:orgPkgData.orgPackageFor,
      orgPackageName:orgPkgData.orgPackageName,
      orgPackageNumSubjects: ''+orgPkgData.orgPackageNumSubjects,
      orgPackageNumCourses: ''+orgPkgData.orgPackageNumCourses,
      orgPackageNumExams: ''+orgPkgData.orgPackageNumExams,
      priceUpto500: orgPkgData.priceUpto500,
      priceUpto1000: orgPkgData.priceUpto1000,
      priceUpto1500: orgPkgData.priceUpto1500,
      priceAfter1500: orgPkgData.priceAfter1500,
      orgPackagePriceComment: ''
    });
    this.orgPackageIcon = orgPkgData['orgPackageIcon'];
    this.packageIconUrl = orgPkgData['signedURL'];
    this.setFeaturePayload(orgPkgData);
 }

 // set feature payload for chips
 setFeaturePayload(_orgPkgData){
  let orgPkgData = _orgPkgData;
  this.features = [];
  let key = 'orgPackageDetails';
  let maxFeature = this.maxFeature;
  for(let i=0;i < maxFeature;i++){
    let orgKey = key+(i+1)
    if(orgPkgData.hasOwnProperty(orgKey))
      this.features.push({name: orgPkgData[orgKey]});
  }
 }


  /**
   * File Upload success handler
   */
  onFileComplete(res){
    console.log(res);
    this.orgPackageIcon = res.data.s3path;
  }

 

}
