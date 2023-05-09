import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
const ACTION_EVENT = ['Edit', 'Subject Mapping', 'Delete'];

@Component({
  selector: 'app-manage-exam',
  templateUrl: './manage-exam.component.html',
  styleUrls: ['./manage-exam.component.scss']
})
export class ManageExamComponent implements OnInit {

  constructor(private router: Router) { }
  public gridConfig;
  ngOnInit(): void {

    this.gridConfig = {
      id: 'exam',
      module: 'course',
      deleteRecordKey: 'examID',
      displayNameKey: 'examName',
      columnList: [
        { id: 'position', name: '#' },
        { id: 'examName', name: 'Exam Name'},
        { id: 'examCode', name: 'Code' },
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
        this.router.navigate(['sc/course/academics/exam/edit', event.row.examID]);
        break;
      case ACTION_EVENT[1]:
          this.router.navigate(['sc/course/academics/exam-subject-mapping', event.row.examID]);
        break;
    }
  }

}
