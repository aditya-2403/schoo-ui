import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DragAndDropComponent } from 'src/app/shared/drag-and-drop/drag-and-drop.component';
import { B2bOrganizationService } from '../../b2borganizations.service';

@Component({
  selector: 'app-org-exam-mapping',
  templateUrl: './org-exam-mapping.component.html',
  styleUrls: ['./org-exam-mapping.component.scss']
})
export class OrgExamMappingComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private b2cOrgService: B2bOrganizationService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  public notMappedExamList = [];
  public mappedExamList = [];
  public orgName: string;
  public planName: string;
  public limits = 'Exam = ';
  public examDragableLimit;
  private orgId: null;
  private pkgDetails;

  @ViewChild(DragAndDropComponent) public dragDropComponent: DragAndDropComponent;
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.orgId = params['id'];
      this.orgName = params['orgName'] || '';
      this.getPkgDetails();
    });
  }

  public updateMapping() {
    const payload = this.createPayload();
    this.b2cOrgService.updateExamMapList(this.orgId, payload)
    .subscribe(data => {
      let snackBarRef = this.snackBar.open(data['message'], 'Close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      snackBarRef.afterDismissed().subscribe(() => {
        this.router.navigate(['/sc/user/b2borganisation/manage']);
      });
    });
  }

  private getPkgDetails() {
    this.b2cOrgService.getAssignPackageData(this.orgId)
      .subscribe(data => {
        this.pkgDetails = data['data'];
        this.planName = this.pkgDetails.packageName || '';
        this.limits = `Exam = ${this.pkgDetails.numExam || ''}`;
        this.examDragableLimit = this.pkgDetails.numExam || 0;
        this.getMapAndUnMapExamList();
      });
  }

  private getMapAndUnMapExamList() {
    const getUnMappedExamList = this.b2cOrgService.getUnMappedExamList(this.orgId);
    const getMappedExamList = this.b2cOrgService.getMappedExamList(this.orgId);
    forkJoin([getUnMappedExamList, getMappedExamList]).subscribe(data => {
      this.notMappedExamList = data[0]['data'];
      this.mappedExamList = data[1].data || [];
    });
  }

  private createPayload() {
    const mapExamList = this.dragDropComponent.updatedTargetList;
    let mappedExam = [];
    if(mapExamList.length) {
      for (let value of mapExamList) {
        const examObj = {
          isActive: 1,
          mapId: value.examID
        };
        mappedExam.push(examObj)
      }
    }
    return mappedExam;
  }

}
