import { Component, OnInit } from '@angular/core';

import { of, from, fromEvent } from 'rxjs';

import { NotificationsService } from '../_shared/services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notificationsSub: string[] = [];
  notificationsBS: string[] = [];

  // OF
  of1$ = of([1, 2, 3]);
  of2$ = of('Alejandro');
  of3$ = of([1, 2, 3], 'Alejandro', () => ({ name: 'Alex' }));
  // FROM
  from1$ = from([1, 2, 3]);
  from2$ = from('Alejandro');
  from3$ = from(new Promise(res => res('Resolved!')));
  // FROM EVENT
  fe1$ = fromEvent(document, 'click');
  fe2$ = fromEvent(document, 'contextmenu');
  fe3$ = fromEvent(document, 'scroll');

  constructor(private readonly notificationsService: NotificationsService) { }

  ngOnInit(): void {
    this.notificationsService.notificationsSub$.subscribe(notifications => this.notificationsSub = notifications);
    this.notificationsService.notificationsBS$.subscribe(notifications => this.notificationsBS = notifications);

    this.of1$.subscribe(v => console.log('[OF 1]:', v));
    this.of2$.subscribe(v => console.log('[OF 2]:', v));
    this.of3$.subscribe(v => console.log('[OF 3]:', v));
    this.from1$.subscribe(v => console.log('--FROM 1--:', v));
    this.from2$.subscribe(v => console.log('--FROM 2--:', v));
    this.from3$.subscribe(v => console.log('--FROM 3--:', v));
    this.fe1$.subscribe(v => console.log('{FE 1}:', v));
    this.fe2$.subscribe(v => console.log('{FE 2}:', v));
    this.fe3$.subscribe(v => console.log('{FE 3}:', v));
  }
}
