import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorDialogComponent } from './error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  public message = '';
  public dialogConfig;

  constructor(private router: Router, private dialog: MatDialog) { }

  public configureErrorDialog(): ErrorHandlerService {
    this.dialogConfig = { ...new MatDialogConfig() };
    this.dialogConfig.height = '200px';
    this.dialogConfig.width = '400px';
    return this;
  }

  public configureDialog(): ErrorHandlerService {
    this.dialogConfig = { ...new MatDialogConfig() };
    this.dialogConfig.height = '200px';
    this.dialogConfig.width = '400px';
    return this;
  }

  // tslint:disable-next-line: typedef
  public handleError(error: HttpErrorResponse) {
    this.createErrorMessage(error);
    this.dialogConfig.data = {
      message: this.message,
      title: 'Error message',
      type: 'error',
      primaryButtonName: 'Ok'
    };
    this.dialog.open(ErrorDialogComponent, this.dialogConfig);
  }

// tslint:disable-next-line: typedef
public handleConfirmbox(message)  {
  this.message = message;
  this.dialogConfig.data = {
    message: this.message,
    title: 'Please confirm',
    type: 'confirm',
    primaryButtonName: 'No Thanks',
    secondaryButtonName: 'Ok'
  };
  return this.dialog.open(ErrorDialogComponent, this.dialogConfig);

}

  // tslint:disable-next-line: typedef
  public handleOtherError(error: HttpErrorResponse) {
    this.createErrorMessage(error);
    this.dialogConfig.data = { errorMessage: this.message };
    this.dialog.open(ErrorDialogComponent, this.dialogConfig);
  }

  // tslint:disable-next-line: typedef
  private createErrorMessage(error)
  {
    this.message = error.error.message;
  }

}
