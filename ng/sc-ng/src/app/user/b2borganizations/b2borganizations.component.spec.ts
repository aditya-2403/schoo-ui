import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2borganizationsComponent } from './b2borganizations.component';

describe('B2borganizationsComponent', () => {
  let component: B2borganizationsComponent;
  let fixture: ComponentFixture<B2borganizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2borganizationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2borganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
