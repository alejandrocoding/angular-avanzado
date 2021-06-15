import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private readonly router: Router) {
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationStart) {
        console.log('START', evt);
      }
      else if (evt instanceof NavigationEnd) {
        console.log('END', evt);
      } else {
        console.log(evt);
      }
    });
    // this.router.events.pipe(filter(evt => evt instanceof NavigationStart)).subscribe(evt => console.log(evt));
  }
}
