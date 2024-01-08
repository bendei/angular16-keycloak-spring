import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {KonnektorViewModule} from './konnektor/konnektor-view.module';
import {RouterModule} from '@angular/router';
import {NavigationModule} from './core/navigation.module';
import {appRouting} from './app.routing';
import { CommonModule } from '@angular/common';
import {AuditlogModule} from './auditlog/auditlog.module';
import {ToastrModule} from 'ngx-toastr';
import {defaultToastConfig} from './toast/toast.service';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CdModule} from "./ChangeDetection/cd.module";
import {Cd2Module} from "./ChangeDetectionTwo/cd2.module";
import {OnpushModule} from "./onpush/onpush.module";
//import { initializeKeycloak } from './init/keycloak-init.factory';
//import {KeycloakService} from "keycloak-angular";
import {Inputfield} from "./contentprojection/inputfield.component";
import {HttpErrorInterceptor} from "./interceptors/HttpErrorInterceptor";
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'myrealm',
        clientId: 'myclient',
      },
      initOptions: {
        onLoad: 'login-required',  // allowed values 'login-required', 'check-sso';
        flow: "standard"          // allowed values 'standard', 'implicit', 'hybrid';
      },
    });
}

@NgModule({
  declarations: [
    AppComponent,
    Inputfield
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    KeycloakAngularModule,
    NavigationModule,
    AuditlogModule,
    CdModule,
    Cd2Module,
    OnpushModule,
    NgbModule,
    BrowserAnimationsModule,
    KonnektorViewModule,
    ToastrModule.forRoot(defaultToastConfig),
    RouterModule.forRoot(appRouting), // mert ez egy main module és akkor itt igy importáljuk és konfiguráunk egy Router modult és nem a forChild()-del

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
   /* {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
     }*/
  ],
  exports: [
    Inputfield

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
