/// <reference types="@angular/localize" />

import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {HttpClientModule} from "@angular/common/http";
import {importProvidersFrom} from "@angular/core";
import {PreloadAllModules, provideRouter, withDebugTracing, withPreloading} from "@angular/router";
import {APP_ROUTES} from "./app/app.routing";
import {navigationRoutes} from "./app/core/navigation.routing";

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule), // importing providers from modules usually
    provideRouter(APP_ROUTES,
      withDebugTracing(),
     // withPreloading(PreloadAllModules)
    ),
    //provideRouter(navigationRoutes)
  ]
});
