import { NavItem } from './../../shared/nav-item';
import { Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit } from '@angular/core';
import {VERSION} from '@angular/material/core';
import { NavService } from 'src/app/shared/nav.service';



@Component({
  selector: 'app-snuser',
  templateUrl: './snuser.component.html',
  styleUrls: ['./snuser.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SnuserComponent implements AfterViewInit {
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
      displayName: 'B2B Users',
      iconName: 'people',
      route: 'devfestfl',
      children: [
        {
          displayName: 'Student',
          iconName: 'people',
          route: 'devfestfl/speakers',
          children: [
            {
              displayName: 'Add Student',
              iconName: 'add',
              route: 'sc/user/b2buser/student/add'
            },
            {
              displayName: 'Manage Student',
              iconName: 'nature_people',
              route: 'sc/user/b2buser/student/manage'
            },
            {
              displayName: 'Upload Bulk Student',
              iconName: 'cloud_upload',
              route: 'sc/user/b2buser/student/bulk-upload'
            }
          ]
        },
        {
          displayName: 'Parent',
          iconName: 'people',
          route: 'devfestfl/sessions',
          children: [
            {
              displayName: 'Add Parent',
              iconName: 'add',
              route: 'sc/user/b2buser/parent/add'
            },
            {
              displayName: 'Manage Parent',
              iconName: 'nature_people',
              route: 'sc/user/b2buser/parent/manage'
            }
          ]
        },
        {
          displayName: 'Teacher',
          iconName: 'people',
          route: 'devfestfl/sessions',
          children: [
            {
              displayName: 'Add Teacher',
              iconName: 'add',
              route: 'sc/user/b2buser/teacher/add'
            },
            {
              displayName: 'Manage Teacher',
              iconName: 'nature_people',
              route: 'sc/user/b2buser/teacher/manage'
            }
          ]
        }
      ]
    },
    {
      displayName: 'Admin Users',
      iconName: 'admin_panel_settings',
      route: 'disney',
      children: [
        {
          displayName: 'Add Admin',
          iconName: 'add',
          route: 'disney/speakers',
        },
        {
          displayName: 'Manage Admin',
          iconName: 'nature_people',
          route: 'disney/speakers',
        },
      ]
    },
    {
      displayName: 'B2B organizations',
      iconName: 'accessibility',
      route: 'orlando',
      children: [
        {
          displayName: 'Add Organisations',
          iconName: 'add',
          route: 'sc/user/b2borganisation/add',
        },
        {
          displayName: 'Manage Organisations',
          iconName: 'nature_people',
          route: 'sc/user/b2borganisation/manage',
        },
        {
          displayName: 'Session',
          iconName: 'emoji_people',
          route: 'orlando/sessions',
          children: [
            {
              displayName: 'Start Session',
              iconName: 'play_circle_filled',
              route: 'sc/user/b2borganisation/session/start'
            },
            {
              displayName: 'Manage Sessions',
              iconName: 'queue_play_next',
              route: 'sc/user/b2borganisation/session/manage'
            }
          ]
        },
        {
          displayName: 'Org Packages',
          iconName: 'backpack',
          route: 'orlando/sessions',
          children: [
            {
              displayName: 'Add Package',
              iconName: 'add',
              route: 'sc/user/b2borganisation/org-package/add'
            },
            {
              displayName: 'Manage Packages',
              iconName: 'nature_people',
              route: 'sc/user/b2borganisation/org-package/manage'
            }
          ]
        },
        {
          displayName: 'Student Packages',
          iconName: 'child_care',
          route: 'orlando/sessions',
          children: [
            {
              displayName: 'Add Student Package',
              iconName: 'add',
              route: 'sc/user/b2borganisation/student-package/add'
            },
            {
              displayName: 'Manage Packages',
              iconName: 'nature_people',
              route: 'sc/user/b2borganisation/student-package/manage'
            }
          ]
        }
      ]
    },
    {
      displayName: 'B2C Portal',
      iconName: 'web',
      route: 'devfestfl',
      children: [
        {
          displayName: 'Packages',
          iconName: 'money',
          route: 'devfestfl/speakers',
          children: [
            {
              displayName: 'Add Package',
              iconName: 'add_shopping_cart',
              route: 'devfestfl/speakers/michael-prentice'
            },
            {
              displayName: 'View Package',
              iconName: 'preview',
              route: 'devfestfl/speakers/stephen-fluin'
            }
          ]
        },
        {
          displayName: 'Students',
          iconName: 'emoji_people',
          route: 'devfestfl/speakers',
          children: [
            {
              displayName: 'View Signups',
              iconName: 'handyman',
              route: 'devfestfl/speakers/michael-prentice'
            },
            {
              displayName: 'Payments',
              iconName: 'payments',
              route: 'devfestfl/speakers/stephen-fluin'
            }
          ]
        }
      ]
    }
  ];

}
