import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgCourseComponent } from './org-course.component';

describe('OrgCourseComponent', () => {
  let component: OrgCourseComponent;
  let fixture: ComponentFixture<OrgCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
