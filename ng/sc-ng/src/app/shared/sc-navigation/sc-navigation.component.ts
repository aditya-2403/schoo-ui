import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavigationEnd, Router, Event } from '@angular/router';
import { NavService } from '../nav.service';

@Component({
  selector: 'app-sc-navigation',
  templateUrl: './sc-navigation.component.html',
  styleUrls: ['./sc-navigation.component.scss']
})
export class ScNavigationComponent {

  navItems =[];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private navService: NavService, private router: Router) {
    this.navItems = navService.navItemsDashboard
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if(event.url.indexOf('/sc/user') != -1)
        {
          this.navItems = navService.navItemsUser
        }
        if(event.url.indexOf('/sc/course') != -1)
        {
          this.navItems = navService.navCourseItems
        }
        if(event.url.indexOf('/sc/dashboard') != -1)
        {
          this.navItems = navService.navItemsDashboard
        }
      }
    });
  }
  

}
