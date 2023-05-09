import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnuserComponent } from './snuser.component';

describe('SnuserComponent', () => {
  let component: SnuserComponent;
  let fixture: ComponentFixture<SnuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
