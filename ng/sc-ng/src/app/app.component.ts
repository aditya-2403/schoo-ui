import { Router, RouterEvent, NavigationCancel, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'sc-ng';
  subscription: Subscription;
  constructor(private router: Router, private spinner: NgxSpinnerService) {

    this.subscription = router.events.subscribe((event) => {

      if (event instanceof RouterEvent) {
        this.navigationIntercepter(event);
      }

    });

  }


  navigationIntercepter(event: RouterEvent): void {
    {
      if (event instanceof NavigationStart) {
        this.spinner.show();

      }
      if (event instanceof NavigationEnd) {
        this.spinner.hide();
        window.scroll(0, 0);
      }
      if (event instanceof NavigationCancel) {
        this.spinner.hide();

      }
      if (event instanceof NavigationError) {

        this.spinner.hide();
      }
    }
  }


  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
