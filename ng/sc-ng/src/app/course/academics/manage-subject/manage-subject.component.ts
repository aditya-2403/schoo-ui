import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
const ACTION_EVENT = ['Edit Subject', 'Delete'];

@Component({
  selector: 'app-manage-subject',
  templateUrl: './manage-subject.component.html',
  styleUrls: ['./manage-subject.component.scss']
})
export class ManageSubjectComponent implements OnInit {

  constructor(private router: Router) { }
  public gridConfig;
  ngOnInit(): void {

    this.gridConfig = {
      id: 'subject',
      module: 'course',
      deleteRecordKey: 'subjectID',
      displayNameKey: 'subjectName',
      columnList: [
        { id: 'position', name: '#' },
        { id: 'subjectName', name: 'Subject Name'},
        { id: 'subjectCode', name: 'Subject Code' }
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
        this.router.navigate(['sc/course/academics/subject/edit', event.row.subjectID]);
        break;
      case ACTION_EVENT[1]:
          //this.router.navigate(['sc/course/academics/subject/subject-mapping', event.row.orgID, event.row.orgname]);
        break;
    }
  }

}
