import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SncourseComponent } from './sncourse.component';

describe('SncourseComponent', () => {
  let component: SncourseComponent;
  let fixture: ComponentFixture<SncourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SncourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SncourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
