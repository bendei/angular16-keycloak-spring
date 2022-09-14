import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
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

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    NavigationModule,
    AuditlogModule,
    CdModule,
    NgbModule,
    BrowserAnimationsModule,
    KonnektorViewModule,
    ToastrModule.forRoot(defaultToastConfig),
    RouterModule.forRoot(appRouting),

  ],
  providers: [],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
