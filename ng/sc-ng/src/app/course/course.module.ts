import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoComponent } from './seo/seo.component';
import { MaterialsComponent } from './materials/materials.component';
import { CourseComponent } from './course.component';
import { CourseRoutingModule } from './course.routing.module';
import { SncourseComponent } from './sncourse/sncourse.component';

import { AcademicsService } from './academics/academics.services';

import { AddChapterComponent } from './academics/add-chapter/add-chapter.component';
import { ManageChapterComponent } from './academics/manage-chapter/manage-chapter.component';
import { AddCourseComponent } from './academics/add-course/add-course.component';
import { ManageCourseComponent } from './academics/manage-course/manage-course.component';
import { AddExamComponent } from './academics/add-exam/add-exam.component';
import { ManageExamComponent } from './academics/manage-exam/manage-exam.component';
import { AddSectionComponent } from './academics/add-section/add-section.component';
import { ManageSectionComponent } from './academics/manage-section/manage-section.component';
import { AddSubjectComponent } from './academics/add-subject/add-subject.component';
import { ManageSubjectComponent } from './academics/manage-subject/manage-subject.component';
import { ManageTopicComponent } from './academics/manage-topic/manage-topic.component';
import { EditTopicComponent } from './academics/edit-topic/edit-topic.component';
import { ExamSubjectMappingComponent } from './academics/exam-subject-mapping/exam-subject-mapping.component'
import { CourseSubjectMappingComponent } from './academics/course-subject-mapping/course-subject-mapping.component'



@NgModule({
  declarations: [SeoComponent, MaterialsComponent, CourseComponent, SncourseComponent,
    AddChapterComponent, ManageChapterComponent,
    AddCourseComponent, ManageCourseComponent, CourseSubjectMappingComponent,
    AddExamComponent, ManageExamComponent, ExamSubjectMappingComponent,
    AddSectionComponent, ManageSectionComponent,
    AddSubjectComponent, ManageSubjectComponent,
    ManageTopicComponent, EditTopicComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    RouterModule,
    CourseRoutingModule
  ],
  providers: [AcademicsService]
})
export class CourseModule { }
