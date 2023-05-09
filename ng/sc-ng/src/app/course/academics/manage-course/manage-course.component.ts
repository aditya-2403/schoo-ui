import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
const ACTION_EVENT = ['Edit Course', 'Subject Mapping', 'Delete'];
@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.scss']
})
export class ManageCourseComponent implements OnInit {

  constructor(private router: Router) { }
  public gridConfig;
  ngOnInit(): void {

    this.gridConfig = {
      id: 'course',
      module: 'course',
      deleteRecordKey: 'courseID',
      displayNameKey: 'courseName',
      columnList: [
        { id: 'position', name: '#' },
        { id: 'courseName', name: 'Course Name'},
        { id: 'courseCode', name: 'Course Code' },
        { id: 'publish', name: 'Publish' }
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
        this.router.navigate(['sc/course/academics/course/edit', event.row.courseID]);
        break;
      case ACTION_EVENT[1]:
          this.router.navigate(['sc/course/academics/course-subject-mapping', event.row.courseID]);
        break;
    }
  }

}
