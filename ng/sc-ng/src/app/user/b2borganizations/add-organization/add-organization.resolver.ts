import { AddOrganizationService } from './add-organization.service';
import { Injectable } from '@angular/core';
import { Resolve, } from '@angular/router';
import { Observable, of } from 'rxjs';
// import { EMPTY } from 'rxjs';

@Injectable()
export class AddOrgResolver implements Resolve<any> {
  constructor(private addService: AddOrganizationService) { }

  resolve(): any {

     return of(null);
  }
}
