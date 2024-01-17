import {ApplicationConfig, ErrorHandler, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import {APP_ROUTES} from "./app.routing";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CommonService} from "./core/common.service";
import {GlobalErrorHandler} from "./core/global-error-handler.service";
import {HttpErrorInterceptor} from "./interceptors/HttpErrorInterceptor";

export const appConfig: ApplicationConfig = {
  // registering providers with the root injector
  providers: [
    provideRouter(APP_ROUTES),
    importProvidersFrom(HttpClientModule),                    // importing providers from modules used in root injector
    {provide: ErrorHandler, useClass: GlobalErrorHandler},    // also registered with the root injector
    {provide: CommonService, useClass: CommonService},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true}
  ]
};
