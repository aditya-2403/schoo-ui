import { TestBed } from '@angular/core/testing';

import { AddOrganizationService } from './add-organization.service';

describe('AddOrganizationService', () => {
  let service: AddOrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddOrganizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
