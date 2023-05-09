import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MenuListItemComponent } from './menu-list-item/menu-list-item.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { NavService } from './nav.service';
import { TokenInterceptorService } from './token.intercepter.service';
import { ErrorHandlerService } from './error-dialog/error-dialog.service';
import { FormsModule } from '@angular/forms';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialFileUploadComponent } from './material-file-upload/material-file-upload.component';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';
import { DataGridComponent } from './data-grid/data-grid.component';
import { DataGridService } from './data-grid/data-grid.service';
import { OrgCourseComponent } from './org-course/org-course.component';
import { HelperService } from './help.service';
import { ScNavigationComponent } from './sc-navigation/sc-navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [MenuListItemComponent,
    TopNavComponent,
    ErrorDialogComponent,
    MaterialFileUploadComponent,
    DragAndDropComponent,
    DataGridComponent,
    OrgCourseComponent,
    ScNavigationComponent,
    AppFooterComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    CKEditorModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    MatTooltipModule
  ],
  exports: [
    MenuListItemComponent,
    ErrorDialogComponent,
    TopNavComponent,
    CommonModule,
    FormsModule,
    CKEditorModule,
    MaterialFileUploadComponent,
    DragAndDropComponent,
    DataGridComponent,
    OrgCourseComponent,
    ScNavigationComponent
  ],
  providers: [NavService, ErrorHandlerService, DataGridService, HelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService, multi: true
    }]
})
export class SharedModule { }
