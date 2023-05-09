import { Injectable } from '@angular/core';
import { Resolve, } from '@angular/router';
import { Observable, of } from 'rxjs';
import { EMPTY } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuResolver implements Resolve<any> {
  constructor() {}

  resolve(): any {
    return of(null);
  }
}
