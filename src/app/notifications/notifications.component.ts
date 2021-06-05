import { Component, OnInit, OnDestroy } from '@angular/core';

import { of, from, fromEvent, Subscription, Subject } from 'rxjs';

import { NotificationsService } from '../_shared/services/notifications.service';
import { tap, map, finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  private subscription!: Subscription;
  private subscriptions: Subscription[] = [];
  private destroy$ = new Subject<void>();

  notificationsSub: string[] = [];
  notificationsBS: string[] = [];

  of$ = of([1, 2, 3]);
  from$ = from([1, 2, 3]);
  click$ = fromEvent<MouseEvent>(document, 'click').pipe(
    tap(e => console.log('TAP!', e)),
    map(e => ({ x: e.clientX, y: e.clientY })),
    takeUntil(this.destroy$),
    finalize(() => console.log('END!'))
  );

  constructor(private readonly notificationsService: NotificationsService) { }

  ngOnInit(): void {
    this.notificationsService.notificationsSub$.subscribe(notifications => this.notificationsSub = notifications);
    this.notificationsService.notificationsBS$.subscribe(notifications => this.notificationsBS = notifications);

    this.click$.subscribe(event => console.log(event));
    this.subscription = this.of$.pipe(tap(v => console.log('of:', v)), finalize(() => console.log('of$ has been completed!'))).subscribe();
    this.subscriptions.push(this.from$.pipe(tap(v => console.log('from:', v)), finalize(() => console.log('from$ has been completed!'))).subscribe());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.destroy$.next();
    this.destroy$.complete();
  }
}
