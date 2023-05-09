import { Component, OnInit } from '@angular/core';

const ACTION_EVENT = ['Delete'];
@Component({
  selector: 'app-manage-session',
  templateUrl: './manage-session.component.html',
  styleUrls: ['./manage-session.component.scss']
})
export class ManageSessionComponent implements OnInit {

  constructor() { }
  public gridConfig;
  ngOnInit(): void {

    this.gridConfig = {
      id: 'session',
      deleteRecordKey: 'orgSessionID',
      displayNameKey: 'orgName',
      columnList: [
        { id: 'position', name: '#' },
        { id: 'orgName', name: 'Organization Name' },
        { id: 'courseName', name: 'Course Name' },
        { id: 'sessionYear', name: 'Academic Year' },
        { id: 'startDate', name: 'Session Start',  isDateColumn: true},
        { id: 'endDate', name: 'Session End',  isDateColumn: true},
      ],
      actionItems: ACTION_EVENT,
      displayActionColumn: true,
      paginationConfig: true
    };

  }

  public gridActionEvent(event) {
    switch (event.eventName) {
      case ACTION_EVENT[1]:
        
        break;
    }
  }

}
