import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { MyControlModule } from './my-control/my-control.module';
import { MyGroupModule } from './my-group/my-group.module';
import { MyArrayModule } from './my-array/my-array.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MyControlModule,
    MyGroupModule,
    MyArrayModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
