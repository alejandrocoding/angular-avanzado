import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NotificationsModule } from './notifications/notifications.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    NotificationsModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
