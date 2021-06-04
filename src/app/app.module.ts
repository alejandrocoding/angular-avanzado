import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MoviesModule } from './movies/movies.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MoviesModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
