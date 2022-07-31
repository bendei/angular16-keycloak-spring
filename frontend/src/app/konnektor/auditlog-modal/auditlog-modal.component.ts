import {Component, Input} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuditLogDTO} from "../../../../target/generated-sources/openapi";

@Component({
  selector: 'app-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
    </div>
    <div class="modal-body">
      {{auditlogs}}
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class AuditLogModal {
  public auditlogs: Array<AuditLogDTO> = [];


  // egy tablazat aminek az összes cellaja editalhato, illetve az tuolso sor elejere kattintva uj vehető fel, sor törölhető, majd minden a Save buttonnal mentheő

  constructor(public activeModal: NgbActiveModal) {}
}


