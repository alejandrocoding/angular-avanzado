import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmployeesModule } from './employees/employees.module';
import { AnimatedInputModule } from './shared/directives/animated-input/animated-input.module';
import { QuoteModule } from './shared/quote/quote.module';

@NgModule({
  imports: [
    BrowserModule,
    EmployeesModule,
    FormsModule,
    AnimatedInputModule,
    QuoteModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
