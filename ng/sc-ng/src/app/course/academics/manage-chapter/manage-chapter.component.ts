import { Component, OnInit,  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AcademicsService } from '../academics.services';
import { Router } from '@angular/router';
const ACTION_EVENT = ['Edit Chapter', 'Topics', 'Delete'];

@Component({
  selector: 'app-manage-chapter',
  templateUrl: './manage-chapter.component.html',
  styleUrls: ['./manage-chapter.component.scss']
})
export class ManageChapterComponent implements OnInit {

  public gridConfig;
  public courseId;
  public subjectId;
  public courseList = [];
  public subjectList = [];
  public isGridShow = false;
  public manageChapterForm: FormGroup;
  constructor( private academicsService: AcademicsService,private router: Router) { }

  ngOnInit(): void {
    this.manageChapterForm =new FormGroup({
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
    this.fetchChapters()
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

  fetchChapters(){
   
    this.isGridShow = true;
    this.gridConfig = {
      id: 'chapter/'+this.courseId+"/"+this.subjectId,
      module: 'course',
      delId: 'chapter',
      deleteRecordKey: 'chapterID',
      deleteRecordKeyword: 'Chapter',
      displayNameKey: 'chapterName',
      columnList: [
        { id: 'position', name: '#' },
        { id: 'chapterNumber', name: 'Chapter No.' },
        { id: 'chapterName', name: 'Chapter Name'},
        { id: 'subjectName', name: 'Subject Name' },
        { id: 'courseName', name: 'Course Name' }
      ],
      actionItems: ACTION_EVENT,
      displayActionColumn: true,
      paginationConfig: true
    };

  }

  public gridActionEvent(event) {
    switch (event.eventName) {
      case ACTION_EVENT[0]:
        console.log('Edit', event);
        this.router.navigate(['/sc/course/academics/chapter/edit', event.row.chapterID]);
        break;
      case ACTION_EVENT[1]:
        
       
      break;
    }
  }

}
