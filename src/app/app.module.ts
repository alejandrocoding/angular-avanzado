import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CatsSearchModule } from './cats-search/cats-search.module';
import { CatsFavModule } from './cats-fav/cats-fav.module';
import { HttpInterceptorModule } from './_core/http-interceptor.module';
import { GlobalErrorHandler } from './_core/global-error-handler.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpInterceptorModule,
    CatsSearchModule,
    CatsFavModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
