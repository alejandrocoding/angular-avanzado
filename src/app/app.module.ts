import { ErrorHandler, NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpInterceptorModule } from './_core/http-interceptor.module';
import { GlobalErrorHandler } from './_core/global-error-handler.service';
import { ConfigService } from './_core/config.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpInterceptorModule,
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [ConfigService],
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function configFactory(config: ConfigService) {
  return () => config.load.apply(config);
}
