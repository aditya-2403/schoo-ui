import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SndashboardComponent } from './sndashboard.component';

describe('SndashboardComponent', () => {
  let component: SndashboardComponent;
  let fixture: ComponentFixture<SndashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SndashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SndashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
