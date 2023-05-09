import { Component, OnInit } from '@angular/core';


const ACTION_EVENT = ['Exam Mapping', 'Tests Mapping',  'Delete'];
@Component({
  selector: 'app-manage-student-package',
  templateUrl: './manage-student-package.component.html',
  styleUrls: ['./manage-student-package.component.scss']
})
export class ManageStudentPackageComponent implements OnInit {

  constructor() { }
  public gridConfig;
  ngOnInit(): void {

    this.gridConfig = {
      id: 'package/student',
      deleteRecordKey: 'packageID',
      displayNameKey: 'packageName',
      columnList: [
        { id: 'position', name: '#' },
        { id: 'packageName', name: 'Package Name' },
        { id: 'orgName', name: 'Organization' },
        { id: 'courseName', name: 'Course' },
        { id: 'packageFees', name: 'Fee' }
      ],
      actionItems: ACTION_EVENT,
      displayActionColumn: true,
      paginationConfig: true,
      filtering: true
    };

  }
  public gridActionEvent(event) {
    switch (event.eventName) {
      case ACTION_EVENT[1]:
        console.log('exam mapping');
        break;
      case ACTION_EVENT[2]:
        console.log('tests mapping');
        break;
    }
  }

}
