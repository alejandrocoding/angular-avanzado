import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/_shared/services/notifications.service';

@Component({
  selector: 'app-notifications-add',
  templateUrl: './notifications-add.component.html',
  styleUrls: ['./notifications-add.component.scss']
})
export class NotificationsAddComponent implements OnInit, OnDestroy {

  newNotification = '';
  notificationsSub: string[] = [];
  notificationsBS: string[] = [];

  constructor(private readonly notificationsService: NotificationsService) { }

  ngOnInit(): void {
    console.log('NotificationsComp INIT');
    this.notificationsService.notificationsSub$.subscribe(notifications => this.notificationsSub = notifications);
    this.notificationsService.notificationsBS$.subscribe(notifications => this.notificationsBS = notifications);
  }

  ngOnDestroy(): void {
    console.log('NotificationsComp Destroy');
  }

  save() {
    if (this.newNotification) {
      this.notificationsService.nextSub([...this.notificationsSub, this.newNotification]);
      this.notificationsService.nextBS([...this.notificationsBS, this.newNotification]);
      this.newNotification = '';
    }
  }
}
