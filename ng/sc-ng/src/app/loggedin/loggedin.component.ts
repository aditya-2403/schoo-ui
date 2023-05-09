import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserIdleService } from 'angular-user-idle';
import { ErrorHandlerService } from '../shared/error-dialog/error-dialog.service';

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.scss']
})
export class LoggedinComponent implements OnInit {

  constructor(private router: Router , private errorService: ErrorHandlerService,private userIdle: UserIdleService) { }

  ngOnInit(): void {

    // Start watching for user inactivity.
    this.userIdle.startWatching();

    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => console.log(count));

    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(
      () => this.applyTimeOut());
  }


  applyTimeOut(): void {
    console.log('Time is up!');
    const matdialogRef = this.errorService.configureDialog().handleConfirmbox('Time is up! Do you want to extend session?!!!');

    matdialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if ('Ok' === result) {
        this.restart();
        this.startWatching();
      } else {
        this.stop();
        this.stopWatching();
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('reftoken');
        this.router.navigate(['/login']);
      }
      matdialogRef.close();
    });

  }

  stop(): void {
    this.userIdle.stopTimer();
  }

  stopWatching(): void {
    this.userIdle.stopWatching();
  }

  startWatching(): void {
    this.userIdle.startWatching();
  }

  restart(): void {
    this.userIdle.resetTimer();
  }

}
