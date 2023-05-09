import { Component, OnInit,  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AcademicsService } from '../academics.services';
import { Router } from '@angular/router';
const ACTION_EVENT = ['Course Material', 'Edit Topic Details', 'Delete'];
@Component({
  selector: 'app-manage-topic',
  templateUrl: './manage-topic.component.html',
  styleUrls: ['./manage-topic.component.scss']
})
export class ManageTopicComponent implements OnInit {

  public gridConfig;
  public courseId;
  public subjectId;
  public courseList = [];
  public subjectList = [];
  public isGridShow = false;
  public manageTopicForm: FormGroup;
  constructor( private academicsService: AcademicsService,private router: Router) { }

  ngOnInit(): void {
    this.manageTopicForm =new FormGroup({
      courseId: new FormControl('', [Validators.required]),
      subjectId: new FormControl('', [Validators.required])
    });
    this.getCourseListData();
  }

  public changeCourse(event) {
    const courseID = event.value.courseID;
    this.courseId = courseID;
    this.getSubjectListData(courseID);
  }

  public changeSubject(event) {
    const subjectID = event.value.subjectID;
    this.subjectId = subjectID;
    this.fetchTopics()
  }

  getCourseListData(){
    this.academicsService.getCourse().subscribe(data => {
      this.courseList = data['data'];
    });
  }
  
  private getSubjectListData(courseId) {
    this.academicsService.getSubjectbyCourseId(courseId).subscribe(data => {
      this.subjectList = data['data'];
    });
  }

  fetchTopics(){
   
    this.isGridShow = true;
    this.gridConfig = {
      id: 'topic/'+this.courseId+"/"+this.subjectId,
      module: 'course',
      delId: 'topic',
      deleteRecordKey: 'topicID',
      deleteRecordKeyword: 'Topic',
      displayNameKey: 'topicName',
      columnList: [
        { id: 'position', name: '#' },
        { id: 'courseName', name: 'Course' },
        { id: 'subjectName', name: 'Subject' },
        { id: 'chapterName', name: 'Chapter' },
        { id: 'topicName', name: 'Topic'}
      ],
      actionItems: ACTION_EVENT,
      displayActionColumn: true,
      paginationConfig: true
    };

  }

  public gridActionEvent(event) {
    switch (event.eventName) {
      case ACTION_EVENT[0]:
        
        break;
      case ACTION_EVENT[1]:
        console.log('Edit', event);
        this.router.navigate(['sc/course/academics/topic/edit', event.row.topicID]);
      break;
    }
  }

  

}
