import {APP_INITIALIZER, ApplicationConfig, ErrorHandler} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import {APP_ROUTES} from "./app.routing";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors} from "@angular/common/http";
import {GlobalErrorHandler} from "./core/global-error-handler.service";
import {HttpErrorInterceptor} from "./interceptors/HttpErrorInterceptor";
import {pistiInterceptor} from "./interceptors/pisti.interceptor";
import {RouteCommonService} from "./core/route.common.service";
import {ObservableService} from "./core/observable.service";
import {initializer} from "./keycloak/app-init";
import {KeycloakService} from "keycloak-angular";

// diese Interface declares eine Array von providers, die für root component und alle seine Kinder zur Verfügung stehen sollen
export const appConfig: ApplicationConfig = {
  // registering providers with the root injector
  providers: [
    provideRouter(APP_ROUTES, withComponentInputBinding()),                         //
    provideHttpClient(withInterceptors([pistiInterceptor])),            // configures HttpClient Service -functional Interceptor (ang 16 style)
    {provide: ErrorHandler, useClass: GlobalErrorHandler},                          // also registered with the root injector
    {provide: RouteCommonService, useClass: RouteCommonService},                              // registering service for used by a group of child components commonly for data shareing
    {provide: ObservableService, useClass: ObservableService},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},      // registering class-based old style interceptor
    {provide: APP_INITIALIZER, useFactory: initializer, multi: true, deps: [KeycloakService]},
    KeycloakService
  ]
};
