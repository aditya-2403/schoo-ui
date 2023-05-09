import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { SndashboardComponent } from './sndashboard/sndashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AppDashboardComponent } from './app-dashboard/app-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';



@NgModule({
  declarations: [SndashboardComponent, DashboardComponent, SndashboardComponent, AppDashboardComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    RouterModule,
    DashboardRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule
  ]
})
export class DashboardModule { }
