import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { B2bOrganizationService } from '../../b2borganizations.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HelperService } from '../../../../shared/help.service';

@Component({
  selector: 'app-assign-package',
  templateUrl: './assign-package.component.html',
  styleUrls: ['./assign-package.component.scss']
})
export class AssignPackageComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private b2bOrgService: B2bOrganizationService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private helperService: HelperService) { }

  public assignForm: FormGroup;
  public assignPkgData;
  public pkgListData = [];
  public examListData: number[];
  public courseListData: number[];
  public subjectListData: number[];
  public selectedPkgName: string;
  public minDate: Date;
  private OrgId;
  private orgPkgId;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.OrgId = params['id'];
      this.getPkgList();
    });
    this.initForm();
    this.minDate = new Date();
  }

  /**
   * Select event for Package list
   * @param selectedPkg : selected pkg Value
   */
  public selectedPkg(selectedPkg) {
    this.updatedAllFieldsAfterSelectedPkg(selectedPkg.value);
    this.resetForm();
  }

  /**
   * Assign package button click event
   */
  public submitFormData() {
    const payload = this.createPayload();
    this.b2bOrgService.mapAssignPkgData(this.OrgId, this.orgPkgId, payload).subscribe(data => {
      let snackBarRef = this.snackBar.open(data['message'], 'Close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      snackBarRef.afterDismissed().subscribe(() => {
        this.router.navigate(['/sc/user//b2borganisation/manage']);
      });
    });
  }

  /* Handle form errors in Angular 8 */
  public errorHandling = (control: string, error: string) => {
    return this.assignForm.controls[control].hasError(error);
  }

  /**
   * Cancel Button click event
   */
  public cancelButtonEvent() {
    this.router.navigate(['/sc/user/b2borganisation/manage']);
  }

  /**
   * Inililize Assing Package form
   */
  private initForm() {
    this.assignForm = this.fb.group({
      orgPackageID: [{ value: '' }, Validators.required],
      numSubject: [{ value: '' }, Validators.required],
      numCourses: [{ value: '' }, Validators.required],
      numExam: [{ value: '' }, Validators.required],
      numStudents: ['', Validators.required],
      perStudentPrice: ['', Validators.required],
      planStartDate: [{ value: '' }, Validators.required],
      planEndDate: [{ value: '' }, Validators.required]
    });
  }

  /**
   * Get Assign Packgage form data
   */
  private getAssignPackageData() {
    this.b2bOrgService.getAssignPackageData(this.OrgId)
      .subscribe(data => {
        this.assignPkgData = data;
        this.selectedPkgName = this.assignPkgData.data.packageName;
      });
  }

  /**
   * Get Package list
   */
  private getPkgList() {
    this.b2bOrgService.getPkgListData().subscribe(data => {
      const pkgData = data['data'];
      this.pkgListData = pkgData.filter(item => {
        if (item.orgPackageFor && item.orgPackageFor.toLowerCase() === 'school') {
          return item;
        }
      });
      this.getAssignPackageData();
    });
  }

  /**
   * Updated Course, Exam and Subject list after change Package option
   * @param pkgId : selected package ID
   */
  private updatedAllFieldsAfterSelectedPkg(pkgId) {
    const selectPkg = this.pkgListData.find(item => {
      return item.orgPackageID === pkgId;
    });
    this.selectedPkgName = selectPkg.orgPackageName;
    this.examListData = this.generateNumberlist(selectPkg.orgPackageNumExams);
    this.subjectListData = this.generateNumberlist(selectPkg.orgPackageNumSubjects);
    this.courseListData = this.generateNumberlist(selectPkg.orgPackageNumCourses);
  }

  /**
   * Generate list for Course, Exam and Subject
   * @param endNumber : Number
   */
  private generateNumberlist(endNumber) {
    const list: number[] = [];
    for (let i = 1; i <= endNumber; i++) {
      list.push(i);
    }
    return list;
  }

  /**
   * Reset Form field value of Assign Package form
   */
  private resetForm() {
    this.assignForm.controls.numSubject.reset();
    this.assignForm.controls.numCourses.reset();
    this.assignForm.controls.numExam.reset();
    this.assignForm.controls.numStudents.reset();
    this.assignForm.controls.perStudentPrice.reset();
    this.assignForm.controls.planStartDate.reset();
    this.assignForm.controls.planEndDate.reset();
  }

  /**
   * Create payload for map Assign service
   */
  private createPayload() {
    // TODO: Need to check pkg id

    const formData = this.assignForm.value;
    if (this.assignPkgData && this.assignPkgData.data) {
      formData.orgPackageMappingID = this.assignPkgData.data.orgPackageMappingID;
    }

    if (formData.orgPackageID) {
      this.orgPkgId = formData.orgPackageID;
      delete formData.orgPackageID;
    }
    formData.planStartDate = this.helperService.getDateFormat(formData.planStartDate); // TODO: need to change
    formData.planEndDate = this.helperService.getDateFormat(formData.planEndDate); // TODO: need to change
    return formData;
  }
}
