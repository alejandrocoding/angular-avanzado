import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../_shared/services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notificationsSub: string[] = [];
  notificationsBS: string[] = [];

  constructor(private readonly notificationsService: NotificationsService) { }

  ngOnInit(): void {
    this.notificationsService.notificationsSub$.subscribe(notifications => this.notificationsSub = notifications);
    this.notificationsService.notificationsBS$.subscribe(notifications => this.notificationsBS = notifications);
  }
}
