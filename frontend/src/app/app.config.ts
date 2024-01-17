import {ApplicationConfig, ErrorHandler, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import {APP_ROUTES} from "./app.routing";
import {HttpClientModule} from "@angular/common/http";
import {FakeService} from "./core/fake.service";
import {GlobalErrorHandler} from "./core/global-error-handler.service";

export const appConfig: ApplicationConfig = {
  // registering providers with the root injector
  providers: [
    provideRouter(APP_ROUTES),
    importProvidersFrom(    // importing providers from modules
      HttpClientModule, FakeService),
    {provide: ErrorHandler, useClass: GlobalErrorHandler}
  ]
};
