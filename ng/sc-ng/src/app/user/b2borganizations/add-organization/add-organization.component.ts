import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { Subscription, Subject} from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { AddOrganizationService } from './add-organization.service';
import { AppService } from '../../../app.service'
import { MaterialFileUploadComponent } from '../../../shared/material-file-upload/material-file-upload.component'
import { Router, ActivatedRoute, Params } from '@angular/router'

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.scss']
})
export class AddOrganizationComponent implements OnInit {
  subscription: Subscription;
  @ViewChild(FormGroupDirective) fromDirective: FormGroupDirective;
  @ViewChild(MaterialFileUploadComponent) fileCmpRef: MaterialFileUploadComponent;
  public orgForm: FormGroup;
  private masterData;
  public states = [];
  public cities = [];
  public orgLogo = ''; 
 
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  editableOrdId: string;
  editableOrgData = [];
  isEditMode: boolean = false;
  constructor( 
    private organizationService: AddOrganizationService,
    private appService: AppService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public route: ActivatedRoute) { }
    
  ngOnInit(): void {
    this.initForm();
    this.getMasterData();
    this.route.params.subscribe((params: Params) =>{
      this.editableOrdId = params['id'];
      this.isEditMode = params['id'] != null;
      if(this.isEditMode) 
        this.fetchOrganizationDetails();
    });   
  }
  
  initForm(){
    this.orgForm = new FormGroup({
      accessLevel: new FormControl('Public'),
      orgname: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
      orgShortName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      orgSlug: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      orgType: new FormControl('school'),
      orgContactName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      orgcontactNumber: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      orgemail: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      orgwebsite: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      orgaddress: new FormControl('', [Validators.required, Validators.maxLength(2000)]),
      stateID: new FormControl('', [Validators.required]),
      cityID: new FormControl('', [Validators.required]),
      isApproved: new FormControl(''),
      isCreateLogin: new FormControl({value: 'true', disabled: true})
    });
  }

  fetchOrganizationDetails(){
    let orgId = this.editableOrdId;
    this.organizationService.getOrganizationDetails(orgId).subscribe(
      res => {
        console.log(res);
        this.editableOrgData = res.data;
        this.populateOrganizaitonForm();
      }
      , error => {
        console.log(error);
      });
  }

  populateOrganizaitonForm(){
    const orgData = this.editableOrgData;
    for (const [key, value] of Object.entries(orgData)) {
      if(this.orgForm.contains(key)) 
          this.setfromControlValue(key, value);
      }
  }

  setfromControlValue(key, value){
    this.orgForm.controls[key].setValue(value);
  }


  private getMasterData = () => {
    this.appService.getMasterData().subscribe(
      res => {
        console.log(res);
        this.masterData = res.data;
        this.states = res.data.states;
        if(this.isEditMode){
          let stateId = this.editableOrgData['stateID'];
          this.setfromControlValue('stateID',  stateId);
          this.onStateChangeHandler(stateId);
        }

      }
      , error => {
        console.log(error);
      });
  }

  onStateChangeHandler(stateID){
    let result = this.masterData.cities.filter(obj => obj.stateID === stateID);
    this.cities = result;
    if(this.isEditMode)
          this.setfromControlValue('cityID',  this.editableOrgData['cityID']);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.orgForm.controls[controlName].hasError(errorName);
  }

  public onCancel() {
    if(!this.isEditMode) {
      this.resetForm();
    } else {
      this.resetForm();
      this.router.navigate(['sc/user/b2borganisation/manage']); 
    }
  }

  public resetForm() {
    this.fromDirective.resetForm();
    this.editableOrdId = null;
    this.isEditMode = null;
    this.editableOrgData = [];
    this.orgForm.reset({
      accessLevel: 'Public',
      isCreateLogin: true
    });
    this.cities = [];
    let fileObj = this.fileCmpRef.files[0];
    this.fileCmpRef.cancelFile(fileObj);
    
  }
  
  public createOwner = (ownerFormValue) => {
    if (this.orgForm.valid) {
      this.executeOwnerCreation(ownerFormValue);
    }
  }

  private executeOwnerCreation = (orgForm) => {
    orgForm['isApproved'] = orgForm['isApproved'] ? "1" : "";
    orgForm['isCreateLogin'] = 'true';
    
    if(!this.isEditMode){
      orgForm['orgLogo'] = this.orgLogo;
      this.organizationService.saveOrganization(orgForm).subscribe(
        res => {
          this.saveUpdateOrganizationSuccessHander(res.message);
        }
        , error => {
          console.log(error);
        });
      } else{
        orgForm['orgID'] = this.editableOrdId;
        orgForm['orgLogo'] = this.orgLogo ? this.orgLogo : this.editableOrgData['orgLogo'];
        this.organizationService.updateOrganization(orgForm).subscribe(
          res => {
            this.saveUpdateOrganizationSuccessHander(res.message);
          }
          , error => {
            console.log(error);
          });
      }
      
  }

  saveUpdateOrganizationSuccessHander(successMessage){
    let snackBarRef = this._snackBar.open(successMessage, 'Success', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    snackBarRef.afterDismissed().subscribe(() => {
      this.resetForm()
      this.router.navigate(['sc/user/b2borganisation/manage']);
    });
    
  }

  onFileComplete(fileUploadResult: any) {
    this.orgLogo = fileUploadResult.data.s3path;
  }

}
