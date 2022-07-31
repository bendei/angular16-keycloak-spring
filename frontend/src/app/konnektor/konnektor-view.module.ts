import { NgModule } from '@angular/core';
import {KonnektorViewComponent} from './konnektor-view.component';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ToastService} from "../toast/toast.service";
import {KonnektorDropdownComponent} from "./konnektor-dropdown/konnektor-dropdown.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {KonnektorRemoveComponent} from "./konnektor-remove/konnektor-remove.component";
import {RouterModule} from "@angular/router";
import {konnektorRoutes} from "./konnektor.routing";
import {KonnektorModifyComponent} from "./konnektor-modify/konnektor-modify.component";
import {AuditLogModal} from "./auditlog-modal/auditlog-modal.component";

@NgModule({
  declarations: [KonnektorViewComponent, KonnektorDropdownComponent, KonnektorRemoveComponent, KonnektorModifyComponent, AuditLogModal],
  providers: [ ToastService, FormBuilder],
  imports: [CommonModule, BrowserModule, NgxDatatableModule, FormsModule,
    ReactiveFormsModule, NgbModule,
    RouterModule.forChild(konnektorRoutes)
  ]
})
export class KonnektorViewModule {

}
