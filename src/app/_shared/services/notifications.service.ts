import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private readonly notificationsSourceSub = new Subject<string[]>();
  private readonly notificationsSourceBS = new BehaviorSubject<string[]>([]);

  notificationsSub$ = this.notificationsSourceSub.asObservable();
  notificationsBS$ = this.notificationsSourceBS.asObservable();

  nextSub(notifications: string[]) {
    this.notificationsSourceSub.next(notifications);
  }

  nextBS(notifications: string[]) {
    this.notificationsSourceBS.next(notifications);
  }
}
