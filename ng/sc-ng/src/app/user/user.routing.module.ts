import { AddOrganizationComponent } from './b2borganizations/add-organization/add-organization.component';
import { AddOrgResolver } from './b2borganizations/add-organization/add-organization.resolver';
import { UserResolver } from './user.resolver';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { ManageOrgComponent } from './b2borganizations/manage-org/manage-org.component';
import { AssignPackageComponent } from './b2borganizations/packages/assign-package/assign-package.component';
import { PortalsComponent } from './portals/portals.component';
import { StartSessionComponent } from './b2borganizations/start-session/start-session.component';
import { ManageSessionComponent } from './b2borganizations/manage-session/manage-session.component';
import { AddOrgPackageComponent } from './b2borganizations/packages/add-org-package/add-org-package.component';
import { ManageOrgPackageComponent } from './b2borganizations/packages/manage-org-package/manage-org-package.component';
import { AddStudentPackageComponent } from './b2borganizations/packages/add-student-package/add-student-package.component';
import { ManageStudentPackageComponent } from './b2borganizations/packages/manage-student-package/manage-student-package.component';
import { CourseMappingComponent } from './b2borganizations/packages/course-mapping/course-mapping.component';
import { AddStudentComponent } from "./b2buser/add-student/add-student.component";
import { ManageStudentComponent } from "./b2buser/manage-student/manage-student.component";
import { UploadBulkStudentComponent } from "./b2buser/upload-bulk-student/upload-bulk-student.component";
import { AddTeacherComponent } from "./b2buser/add-teacher/add-teacher.component";
import { ManageTeacherComponent } from "./b2buser/manage-teacher/manage-teacher.component";
import { SubjectMappingComponent } from "./b2buser/subject-mapping/subject-mapping.component";
import { AddParentComponent } from "./b2buser/add-parent/add-parent.component";
import { ManageParentComponent } from "./b2buser/manage-parent/manage-parent.component";
import { OrgExamMappingComponent } from './b2borganizations/packages/org-exam-mapping/org-exam-mapping.component';

const routes: Routes = [
  {
    path: '', component: UserComponent, resolve: [ UserResolver ]
    , children: [
      { path: '', redirectTo: 'user', pathMatch: 'full' },
      { path: 'b2borganisation/manage', component: ManageOrgComponent },
      { path: 'b2borganisation/add', component: AddOrganizationComponent, resolve: [AddOrgResolver]},
      { path: 'b2borganisation/edit/:id', component: AddOrganizationComponent, resolve: [AddOrgResolver]},
      { path: 'b2borganisation/assign-package/:id', component: AssignPackageComponent},
      { path: 'b2borganisation/session/start', component: StartSessionComponent},
      { path: 'b2borganisation/session/manage', component: ManageSessionComponent },
      { path: 'b2borganisation/org-package/add', component: AddOrgPackageComponent},
      { path: 'b2borganisation/org-package/edit/:id', component: AddOrgPackageComponent},
      { path: 'b2borganisation/org-package/manage', component: ManageOrgPackageComponent },
      { path: 'b2borganisation/student-package/add', component: AddStudentPackageComponent},
      { path: 'b2borganisation/student-package/manage', component: ManageStudentPackageComponent },
      { path: 'b2borganisation/portals', component: PortalsComponent },
      { path: 'b2borganisation/organization-course-mapping/:id/:orgName', component: CourseMappingComponent },
      { path: 'b2borganisation/organization-exam-mapping/:id/:orgName', component: OrgExamMappingComponent },
      { path: 'b2buser/student/add', component: AddStudentComponent },
      { path: 'b2buser/student/manage', component: ManageStudentComponent},
      { path: 'b2buser/student/bulk-upload', component: UploadBulkStudentComponent},
      { path: 'b2buser/teacher/add', component: AddTeacherComponent },
      { path: 'b2buser/teacher/manage', component: ManageTeacherComponent},
      { path: 'b2buser/teacher-subject-mapping/:tchrId/:orgId/:teacherName/:orgName', component: SubjectMappingComponent },
      { path: 'b2buser/parent/add', component: AddParentComponent },
      { path: 'b2buser/parent/manage', component: ManageParentComponent},
      
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AddOrgResolver]
})
export class UserRoutingModule { }
