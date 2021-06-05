import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NotificationsComponent } from './notifications.component';
import { NotificationsAddComponent } from './notifications-add/notifications-add.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    NotificationsComponent,
    NotificationsAddComponent,
  ]
})
export class NotificationsModule { }
