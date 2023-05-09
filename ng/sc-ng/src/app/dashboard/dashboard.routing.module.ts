import { DashboardResolver } from './dashboard.resolver';
import { DashboardComponent } from './dashboard.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppDashboardComponent } from './app-dashboard/app-dashboard.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, resolve: [DashboardResolver]
    , children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'app-dashboard', component: AppDashboardComponent },
      
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DashboardResolver]
})
export class DashboardRoutingModule { }
