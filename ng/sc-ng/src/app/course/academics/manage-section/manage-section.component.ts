import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
const ACTION_EVENT = ['Delete'];
@Component({
  selector: 'app-manage-section',
  templateUrl: './manage-section.component.html',
  styleUrls: ['./manage-section.component.scss']
})
export class ManageSectionComponent implements OnInit {

  constructor(private router: Router) { }
  public gridConfig;
  ngOnInit(): void {

    this.gridConfig = {
      id: 'section',
      module: 'course',
      deleteRecordKey: 'sectionID',
      displayNameKey: 'sectionName',
      columnList: [
        { id: 'position', name: '#' },
        { id: 'orgname', name: 'Organization Name'},
        { id: 'courseName', name: 'Course Name' },
        { id: 'sectionName', name: 'Section Name' }
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
        
        break;
     
    }
  }

}
