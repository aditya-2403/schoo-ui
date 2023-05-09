import { Component, OnInit } from '@angular/core';
import { B2buserService } from '../b2buser.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
const ACTION_EVENT = ['Map Subject', 'Delete'];
@Component({
  selector: 'app-manage-teacher',
  templateUrl: './manage-teacher.component.html',
  styleUrls: ['./manage-teacher.component.scss']
})
export class ManageTeacherComponent implements OnInit {

  constructor(private router: Router, private b2bUserService: B2buserService, private b2BUser: B2buserService) { }
  public gridConfig;
  public orgListData = [];
  public orgId = '';
  public isGridShow = false;
  public teacherOrgDropdown: FormControl;
  ngOnInit(): void {
    this.teacherOrgDropdown = new FormControl('', Validators.required);
    this.b2bUserService.getOrganizations().subscribe(data => {
      this.orgListData = data['data'];
    });
  }

  public changeOrganication(selectedValue): void {
    this.orgId = selectedValue.value.orgID;
    this.fetchRecord();
  }
  public fetchRecord(): void {
    console.log(this.orgId);
    this.isGridShow = true;
    this.gridConfig = {
      id: `teacher/${this.orgId}`,
      delId: 'teacher',
      deleteRecordKey: 'teacherID',
      deleteRecordKeyword: 'Teacher',
      displayNameKey: 'teacherName',
      columnList: [
        { id: 'position', name: '#' },
        { id: 'teacherName', name: 'Teacher Name' },
        { id: 'orgName', name: 'Organization' },
        { id: 'gender', name: 'Gender' },
        { id: 'teacherMobile', name: 'Mobile' },
        { id: 'username', name: 'Temporary Password' },
      ],
      actionItems: ACTION_EVENT,
      displayActionColumn: true,
      paginationConfig: true
    };
  }

  public gridActionEvent(event) {
    switch (event.eventName) {
      case ACTION_EVENT[0]:
        const teacherData = event.row;
        this.router.navigate(['sc/user/b2buser/teacher-subject-mapping/', teacherData.teacherID, teacherData.orgID, teacherData.teacherName, teacherData.orgName]);
        break;
    }
  }

}
