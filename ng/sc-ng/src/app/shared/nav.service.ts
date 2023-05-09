import {EventEmitter, Injectable} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import { NavItem } from './nav-item';

@Injectable({providedIn : 'root'})
export class NavService {
  public appDrawer: any;
  public currentUrl = new BehaviorSubject<string>(undefined);

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  public closeNav() {
    this.appDrawer.close();
  }

  public openNav() {
    this.appDrawer.open();
  }

   // tslint:disable-next-line: member-ordering
   navItemsDashboard: NavItem[] = [
    {
      displayName: 'Dashboard',
      iconName: 'dashboard',
      route: 'sc/dashboard/app-dashboard'
    }
  ];

  // tslint:disable-next-line: member-ordering
  navCourseItems: NavItem[] = [
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


  navItemsUser: NavItem [] = [
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
