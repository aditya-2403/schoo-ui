import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CourseModule } from './course/course.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoggedinComponent } from './loggedin/loggedin.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { MenuComponent } from './menu/menu.component';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { AppService } from './app.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    LoggedinComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    UserModule,
    CourseModule,
    DashboardModule
  ],
  exports: [
    FooterComponent
  ],
  providers: [LoginService, AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
