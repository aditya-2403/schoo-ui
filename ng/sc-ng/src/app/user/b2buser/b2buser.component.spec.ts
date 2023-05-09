import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2buserComponent } from './b2buser.component';

describe('B2buserComponent', () => {
  let component: B2buserComponent;
  let fixture: ComponentFixture<B2buserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2buserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2buserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
