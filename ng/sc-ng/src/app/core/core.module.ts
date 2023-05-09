import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MAT_DATE_LOCALE, ShowOnDirtyErrorStateMatcher, ErrorStateMatcher } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { UserIdleModule } from 'angular-user-idle';
import { MatFileUploadModule } from 'mat-file-upload';
import { MatSortModule } from '@angular/material/sort';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatTableExporterModule } from 'mat-table-exporter';
// import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    NgxSpinnerModule,
    MatFileUploadModule,
    MatSortModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSnackBarModule,
    MatChipsModule,
    DragDropModule,
    MatTableExporterModule,
    // Optionally you can set time for `idle`, `timeout` and `ping` in seconds.
    // Default values: `idle` is 600 (10 minutes), `timeout` is 300 (5 minutes)
    // and `ping` is 120 (2 minutes).
    UserIdleModule.forRoot({idle: 600, timeout: 300, ping: 120})
   // Ng2SmartTableModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-US' },
  { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ],
  exports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    FlexLayoutModule,
    HttpClientModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    NgxSpinnerModule,
    UserIdleModule,
    MatRadioModule,
    MatFileUploadModule,
    MatSortModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSelectModule,
    MatChipsModule,
    DragDropModule,
    MatTableExporterModule
   // Ng2SmartTableModule
  ]
})
export class CoreModule { }
