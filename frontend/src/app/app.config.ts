import {APP_INITIALIZER, ApplicationConfig, ErrorHandler, importProvidersFrom} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import {APP_ROUTES} from "./app.routing";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors} from "@angular/common/http";
import {GlobalErrorHandler} from "./core/global-error-handler.service";
import {corsInterceptor} from "./interceptors/cors.interceptor";
import {RouteCommonService} from "./core/route.common.service";
import {ObservableService} from "./core/observable.service";
import {KeycloakService} from "keycloak-angular";
import {initializer} from "./keycloak/app-init";
import {environment} from "../environments/environment";
import {DefaultService} from "./openapi-generated-sources";
import {LoggerModule, NgxLoggerLevel} from "ngx-logger";
import {myErrorInterceptor} from "./interceptors/myerror.interceptor";
import {NAVIGATION_ROUTES} from "./core/navigation.routing";

// diese Interface declares eine Array von providers, die für root component und alle seine Kinder zur Verfügung stehen sollen
export const appConfig: ApplicationConfig = {
  // registering providers with the root injector
  providers: [
    provideRouter(APP_ROUTES, withComponentInputBinding()),      // withComponentInputBinding: ActivatedRoutes wird seit 16 nicht verwendet, sondern mit @Input
                                                                // um route parameters zu lesen

    provideHttpClient(withInterceptors([myErrorInterceptor, corsInterceptor])),            // configures HttpClient Service with functional Interceptor (ang 16 style)
    {provide: ErrorHandler, useClass: GlobalErrorHandler},                          // also registered with the root injector
    {provide: RouteCommonService, useClass: RouteCommonService},                              // registering service for used by a group of child components commonly for data shareing
   // {provide: ObservableService, useClass: ObservableService},
   // {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},      // registering class-based old style interceptor

  // COMMENT OUT IF WANT TO RUN APP IN CHOME
    //{provide: KeycloakService, useClass: KeycloakService},
    //{provide: APP_INITIALIZER, useFactory: initializer, multi: true, deps: [KeycloakService]},

    // mock server API backend provider, ez kell mert itt döl el hogy mock vagy real backendet hivunk meg
    {provide: DefaultService, useClass: environment.apiService},
    // importing ngx-logger module's providers
    importProvidersFrom(LoggerModule.forRoot({
      serverLoggingUrl: 'http://localhost:8081/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR,

    }))
  ]
};
