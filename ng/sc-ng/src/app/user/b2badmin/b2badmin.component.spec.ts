import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2badminComponent } from './b2badmin.component';

describe('B2badminComponent', () => {
  let component: B2badminComponent;
  let fixture: ComponentFixture<B2badminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2badminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2badminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
