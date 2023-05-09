import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgExamMappingComponent } from './org-exam-mapping.component';

describe('OrgExamMappingComponent', () => {
  let component: OrgExamMappingComponent;
  let fixture: ComponentFixture<OrgExamMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgExamMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgExamMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
