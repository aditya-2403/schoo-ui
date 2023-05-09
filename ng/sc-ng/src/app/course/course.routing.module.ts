import { SeoComponent } from './seo/seo.component';
import { MaterialsComponent } from './materials/materials.component';
import { SncourseComponent } from './sncourse/sncourse.component';
import { CourseComponent } from './course.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
import { ExamSubjectMappingComponent } from './academics/exam-subject-mapping/exam-subject-mapping.component';
import { CourseSubjectMappingComponent } from './academics/course-subject-mapping/course-subject-mapping.component';

const routes: Routes = [
  {
    path: '', component: CourseComponent
    , children: [
      { path: '', redirectTo: 'course', pathMatch: 'full' },
      { path: 'materials', component: MaterialsComponent },
      { path: 'seo', component: SeoComponent },
      { path: 'seo', component: SeoComponent },
      { path: 'academics/exam/add', component: AddExamComponent },
      { path: 'academics/exam/edit/:id', component: AddExamComponent},
      { path: 'academics/exam/manage', component: ManageExamComponent },
      { path: 'academics/exam-subject-mapping/:examId', component: ExamSubjectMappingComponent},
      { path: 'academics/course/add', component: AddCourseComponent },
      { path: 'academics/course/edit/:id', component: AddCourseComponent},
      { path: 'academics/course/manage', component: ManageCourseComponent },
      { path: 'academics/course-subject-mapping/:courseId', component: CourseSubjectMappingComponent},
      { path: 'academics/section/add', component: AddSectionComponent },
      { path: 'academics/section/manage', component: ManageSectionComponent },
      { path: 'academics/subject/add', component: AddSubjectComponent },
      { path: 'academics/subject/edit/:id', component: AddSubjectComponent},
      { path: 'academics/subject/manage', component: ManageSubjectComponent },
      { path: 'academics/chapter/add', component: AddChapterComponent },
      { path: 'academics/chapter/edit/:id', component: AddChapterComponent},
      { path: 'academics/chapter/manage', component: ManageChapterComponent },
      { path: 'academics/topic/manage', component: ManageTopicComponent },
      { path: 'academics/topic/edit/:id', component: EditTopicComponent},
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
