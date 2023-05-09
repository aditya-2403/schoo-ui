import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { MenuResolver } from './menu/menu.resolver';
import { AuthGuard } from './auth.guard';
import { LoggedinComponent } from './loggedin/loggedin.component';



const routes: Routes = [
  { path: 'index.html', redirectTo: '/login' },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'sc', component: LoggedinComponent, canActivate: [AuthGuard]
    , children: [
      { path: 'menu', component: MenuComponent, resolve: [MenuResolver] },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: 'user', loadChildren: './user/user.module#UserModule'},
      { path: 'course', loadChildren: './course/course.module#CourseModule' }
  ]
  }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
