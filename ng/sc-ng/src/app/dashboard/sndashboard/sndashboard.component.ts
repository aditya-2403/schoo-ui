import { NavItem } from './../../shared/nav-item';
import { Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit } from '@angular/core';
import {VERSION} from '@angular/material/core';
import { NavService } from 'src/app/shared/nav.service';

@Component({
  selector: 'app-sndashboard',
  templateUrl: './sndashboard.component.html',
  styleUrls: ['./sndashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SndashboardComponent implements AfterViewInit {

  @ViewChild('appDrawer') appDrawer: ElementRef;
  version = VERSION;
  constructor(private navService: NavService) {
  }

  // tslint:disable-next-line: typedef
  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

  // tslint:disable-next-line: member-ordering
  navItems: NavItem[] = [
    {
      displayName: 'Dashboard',
      iconName: 'dashboard',
      route: 'devfestfl'
    }
  ];

}
