import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
const ACTION_EVENT = ['Assign Package', 'Course Mapping', 'Exam Mapping', 'Edit', 'Delete'];
@Component({
  selector: 'app-manage-org',
  templateUrl: './manage-org.component.html',
  styleUrls: ['./manage-org.component.scss']
})
export class ManageOrgComponent implements OnInit {

  constructor(private router: Router) { }
  public gridConfig;
  ngOnInit(): void {

    this.gridConfig = {
      id: 'organizations',
      deleteRecordKey: 'orgID',
      displayNameKey: 'orgname',
      columnList: [
        { id: 'position', name: '#' },
        { id: 'signedUrl', name: '', isImageColumn: true, className: 'logo-column' },
        { id: 'orgname', name: 'Organization Name' },
        { id: 'accessLevel', name: 'Access Level' },
        { id: 'orgcontactNumber', name: 'Contact' },
        { id: 'orgemail', name: 'Email' },
      ],
      actionItems: ACTION_EVENT,
      displayActionColumn: true,
      paginationConfig: true,
    };

  }
  public gridActionEvent(event) {
    console.log(event);
    switch (event.eventName) {
      case ACTION_EVENT[0]:
        console.log('assign package');
        this.router.navigate(['sc/user/b2borganisation/assign-package', event.row.orgID]);
        break;
      case ACTION_EVENT[1]:
          this.router.navigate(['sc/user/b2borganisation/organization-course-mapping', event.row.orgID, event.row.orgname]);
        break;
      case ACTION_EVENT[2]:
          console.log('Exam Mapping');
          this.router.navigate(['sc/user/b2borganisation/organization-exam-mapping', event.row.orgID, event.row.orgname]);
        break;
      case ACTION_EVENT[3]:
          console.log('edit');
          this.router.navigate(['sc/user/b2borganisation/edit', event.row.orgID]);
        break;
    }
  }
}
export interface OrgData {
  organizationName: string;
  position: number;
  logo: string;
  accessLevel: string;
  contactPersion: string;
  email: string;
  action: string;
}

