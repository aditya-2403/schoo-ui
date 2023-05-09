import { NavItem } from './../../shared/nav-item';
import { Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit } from '@angular/core';
import {VERSION} from '@angular/material/core';
import { NavService } from 'src/app/shared/nav.service';


@Component({
  selector: 'app-sncourse',
  templateUrl: './sncourse.component.html',
  styleUrls: ['./sncourse.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SncourseComponent implements AfterViewInit {

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
      displayName: 'Academics',
      iconName: 'admin_panel_settings',
      route: 'book',
      children: [
        {
          displayName: 'Exams',
          iconName: 'add',
          route: 'disney/speakers',
          children: [
            {
              displayName: 'Add Exam',
              iconName: 'explore',
              route: 'sc/course/academics/exam/add',
            },
            {
              displayName: 'Manage Exam',
              iconName: 'group_work',
              route: 'sc/course/academics/exam/manage',
            },
          ]
        },
        {
          displayName: 'Course',
          iconName: 'g_translate',
          route: 'disney/speakers',
          children: [
            {
              displayName: 'Add Course',
              iconName: 'get_app',
              route: 'sc/course/academics/course/add',
            },
            {
              displayName: 'Manage Courses',
              iconName: 'group_work',
              route: 'sc/course/academics/course/manage',
            },
            {
              displayName: 'Add Section',
              iconName: 'add',
              route: 'sc/course/academics/section/add',
            },
            {
              displayName: 'Manage Section',
              iconName: 'group_work',
              route: 'sc/course/academics/section/manage',
            },
          ]
        },
        {
          displayName: 'Subject',
          iconName: 'add',
          route: 'disney/speakers',
          children: [
            {
              displayName: 'Add Subject',
              iconName: 'add',
              route: 'sc/course/academics/subject/add',
            },
            {
              displayName: 'Manage Subjects',
              iconName: 'group_work',
              route: 'sc/course/academics/subject/manage',
            }
          ]
        },
        {
          displayName: 'Chapter',
          iconName: 'add',
          route: 'disney/speakers',
          children: [
            {
              displayName: 'Add Chapter',
              iconName: 'add',
              route: 'sc/course/academics/chapter/add',
            },
            {
              displayName: 'Manage Chapters',
              iconName: 'group_work',
              route: 'sc/course/academics/chapter/manage',
            }
          ]
        },
        {
          displayName: 'Topics',
          iconName: 'add',
          route: 'disney/speakers',
          children: [
            {
              displayName: 'Manage Topics',
              iconName: 'group_work',
              route: 'sc/course/academics/topic/manage',
            }
          ]
        }
      ]
    },
    {
      displayName: 'Upload Materials',
      iconName: 'cloud_upload',
      route: 'orlando',
      children: [
        {
          displayName: 'Test',
          iconName: 'add',
          route: 'orlando/speakers',
          children: [
            {
              displayName: 'Add Test',
              iconName: 'add',
              route: 'disney/speakers',
            },
            {
              displayName: 'Manage Test',
              iconName: 'group_work',
              route: 'disney/speakers',
            }
          ]
        },
        {
          displayName: 'Course Material',
          iconName: 'nature_people',
          route: 'orlando/sessions',
          children: [
            {
              displayName: 'Add Material',
              iconName: 'add',
              route: 'disney/speakers',
            },
            {
              displayName: 'Manage Material',
              iconName: 'group_work',
              route: 'disney/speakers',
            }
          ]
        },
        {
          displayName: 'Question',
          iconName: 'emoji_people',
          route: 'orlando/sessions',
          children: [
            {
              displayName: 'Add Question',
              iconName: 'add',
              route: 'orlando/sessions/material-design'
            },
            {
              displayName: 'Manage Question',
              iconName: 'group_work',
              route: 'orlando/sessions/what-up-web'
            },
            {
              displayName: 'Bulk Upload',
              iconName: 'cloud_upload',
              route: 'orlando/sessions/what-up-web'
            }
          ]
        }
      ]
    },
    {
      displayName: 'SEO & Content',
      iconName: 'accessibility',
      route: 'orlando',
      children: [
        {
          displayName: 'SEO Content',
          iconName: 'ballot',
          route: 'orlando/speakers',
          children: [
            {
              displayName: 'Add Content',
              iconName: 'add',
              route: 'disney/speakers',
            },
            {
              displayName: 'Manage Content',
              iconName: 'group_work',
              route: 'disney/speakers',
            }
          ]
        },
        {
          displayName: 'Blog',
          iconName: 'bookmarks',
          route: 'orlando/sessions',
          children: [
            {
              displayName: 'Add Category',
              iconName: 'add',
              route: 'disney/speakers',
            },
            {
              displayName: 'Manage Category',
              iconName: 'group_work',
              route: 'disney/speakers',
            },
            {
              displayName: 'Add Post',
              iconName: 'add',
              route: 'disney/speakers',
            },
            {
              displayName: 'Manage Post',
              iconName: 'group_work',
              route: 'disney/speakers',
            }
          ]
        }
      ]
    }
  ];

}
