import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { B2buserComponent } from './b2buser/b2buser.component';
import { B2borganizationsComponent } from './b2borganizations/b2borganizations.component';
import { B2badminComponent } from './b2badmin/b2badmin.component';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user.routing.module';
import { SnuserComponent } from './snuser/snuser.component';
import { ManageOrgComponent } from './b2borganizations/manage-org/manage-org.component';
import { AddOrganizationComponent } from './b2borganizations/add-organization/add-organization.component';
import { AddOrganizationService } from './b2borganizations/add-organization/add-organization.service';
import { PortalsComponent } from './portals/portals.component';
import { AssignPackageComponent } from './b2borganizations/packages/assign-package/assign-package.component'
import { StartSessionComponent } from './b2borganizations/start-session/start-session.component';
import { ManageSessionComponent } from './b2borganizations/manage-session/manage-session.component';
import { AddOrgPackageComponent } from './b2borganizations/packages/add-org-package/add-org-package.component';
import { ManageOrgPackageComponent } from './b2borganizations/packages/manage-org-package/manage-org-package.component';
import { AddStudentPackageComponent } from './b2borganizations/packages/add-student-package/add-student-package.component';
import { ManageStudentPackageComponent } from './b2borganizations/packages/manage-student-package/manage-student-package.component';
import { B2bOrganizationService } from './b2borganizations/b2borganizations.service';
import { B2buserService } from './b2buser/b2buser.service';
import { CourseMappingComponent } from './b2borganizations/packages/course-mapping/course-mapping.component';
import { AddStudentComponent } from "./b2buser/add-student/add-student.component";
import { ManageStudentComponent } from "./b2buser/manage-student/manage-student.component";
import { UploadBulkStudentComponent } from "./b2buser/upload-bulk-student/upload-bulk-student.component";
import { AddTeacherComponent } from "./b2buser/add-teacher/add-teacher.component";
import { ManageTeacherComponent } from "./b2buser/manage-teacher/manage-teacher.component";
import { SubjectMappingComponent } from "./b2buser/subject-mapping/subject-mapping.component";
import { AddParentComponent } from "./b2buser/add-parent/add-parent.component";
import { ManageParentComponent } from "./b2buser/manage-parent/manage-parent.component";
import { OrgExamMappingComponent } from "./b2borganizations/packages/org-exam-mapping/org-exam-mapping.component";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [
    B2buserComponent,
    B2borganizationsComponent,
    B2badminComponent,
    UserComponent,
    SnuserComponent,
    ManageOrgComponent,
    AddOrganizationComponent,
    AssignPackageComponent,
    StartSessionComponent,
    ManageSessionComponent,
    AddOrgPackageComponent,
    ManageOrgPackageComponent,
    AddStudentPackageComponent,
    ManageStudentPackageComponent,
    PortalsComponent,
    CourseMappingComponent,
    AddStudentComponent,
    ManageStudentComponent,
    UploadBulkStudentComponent,
    AddTeacherComponent,
    ManageTeacherComponent,
    SubjectMappingComponent,
    AddParentComponent,
    ManageParentComponent,
    OrgExamMappingComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    RouterModule,
    UserRoutingModule,
    MatAutocompleteModule
  ],
  providers: [AddOrganizationService, B2bOrganizationService, B2buserService]
})
export class UserModule { }
