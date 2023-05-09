import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { B2buserService } from '../b2buser.service';


const ACTION_EVENT = ['Delete', 'Reset'];
@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.scss']
})
export class ManageStudentComponent implements OnInit {
  public manageStudentForm: FormGroup;
  constructor(private fb: FormBuilder, private b2buserService: B2buserService,private snackBar: MatSnackBar) { }
  public gridConfig;
  public orgId = "";
  public courseId = "";
  public isGridShow = false;
  ngOnInit(): void {
    this.manageStudentForm = this.fb.group({ });
  }

  public getCourseDetails(data){
    const formData = this.manageStudentForm.value;
    this.courseId = formData.courseDropdown.courseID
    this.orgId = formData.orgDropdown.orgID;
    this.fetchRecoard();
  }

  public fetchRecoard(){
    this.isGridShow = true;
    this.gridConfig = {
      id: 'student/'+this.orgId+"/"+this.courseId,
      delId: 'student',
      deleteRecordKey: 'studentID',
      deleteRecordKeyword: 'Student',
      displayNameKey: 'studentName',
      isExportExcel: true,
      columnList: [
        { id: 'position', name: '#' },
        { id: 'studentName', name: 'Student Name' },
        { id: 'orgName', name: 'Organization' },
        { id: 'courseName', name: 'Course/Class' },
        { id: 'sectionName', name: 'Section' },
        { id: 'gender', name: 'Gender'},
        { id: 'userName', name: 'UserName'},
      ],
      actionItems: ACTION_EVENT,
      displayActionColumn: true,
      paginationConfig: true
    };
  }

  resetUserPassword(userId){
    
    this.b2buserService.resetUserPassword(userId).subscribe(data => {
      let snackBarRef = this.snackBar.open(data['message'], 'Close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      snackBarRef.afterDismissed().subscribe(() => {
       
      });
    });
  }

  public gridActionEvent(event) {
    switch (event.eventName) {
      case ACTION_EVENT[0]:
        
        break;
      case ACTION_EVENT[1]:
        console.log('Reset', event);
        let userId = event.row.userId;
        this.resetUserPassword(userId);
          break;
    }
  }

}
