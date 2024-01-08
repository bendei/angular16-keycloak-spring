/// <reference types="@angular/localize" />

import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {HttpClientModule} from "@angular/common/http";
import {importProvidersFrom} from "@angular/core";

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule) // importing providers from modules usually

  ]
});
