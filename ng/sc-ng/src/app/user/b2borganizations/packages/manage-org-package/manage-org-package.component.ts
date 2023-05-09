import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const ACTION_EVENT = ['Edit', 'Delete'];
@Component({
  selector: 'app-manage-org-package',
  templateUrl: './manage-org-package.component.html',
  styleUrls: ['./manage-org-package.component.scss']
})
export class ManageOrgPackageComponent implements OnInit {

  constructor(private router: Router) { }
  public gridConfig;
  ngOnInit(): void {

    this.gridConfig = {
      id: 'package',
      deleteRecordKey: 'orgPackageID',
      displayNameKey: 'orgPackageName',
      columnList: [
        { id: 'position', name: '#' },
        { id: 'orgPackageName', name: 'Package Name' },
        { id: 'orgPackageFor', name: 'for' },
        { id: 'orgPackageNumSubjects', name: 'Subjects' },
        { id: 'orgPackageNumCourses', name: 'Courses' },
        { id: 'orgPackageNumExams', name: 'Exams' },
        { id: 'priceUpto500', name: 'Price(< 500)' },
        { id: 'priceUpto1000', name: 'Price(< 1000)' },
        { id: 'priceUpto1500', name: 'Price(< 1500)' },
        { id: 'priceAfter1500', name: 'Price(> 1500)' }
      ],
      actionItems: ACTION_EVENT,
      displayActionColumn: true,
      paginationConfig: true,
      filtering: true
    };

  }
  public gridActionEvent(event) {
    switch (event.eventName) {
      case ACTION_EVENT[0]:
        this.router.navigate(['sc/user/b2borganisation/org-package/edit', event.row.orgPackageID]);
        break;
    }
  }

}
