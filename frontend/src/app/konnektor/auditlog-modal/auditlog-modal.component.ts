import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AuditLogDTO, AuditLogMessageDTO, DefaultService} from "../../../../target/generated-sources/openapi";
import {mapToString} from '../../core/AuditLogMessageMapper';
import {DatePipe} from "@angular/common";
import {ToastService} from "../../toast/toast.service";
import {Router} from "@angular/router";

const PAD_TIME = "T01:00:00.59";

@Component({
  selector: 'app-modal-content',
  templateUrl: './auditlog-modal.component.html',
  providers: [DatePipe]
})
export class AuditlogModalComponent {

  public auditlogs: Array<AuditLogDTO> = [];
  private auditlogsToBeSaved: AuditLogDTO[] = [];
  public editable = {}; // empty object type, with later members editable[2]=true;

  constructor(public activeModal: NgbActiveModal, private datePipe: DatePipe, private readonly defaultService: DefaultService, private readonly toast: ToastService,
              private readonly router: Router) {}

  public onAddNew(): void {
    console.log(this.auditlogs.length);
    // new entry pushed to the auditlogs, setting editable also
  }

  public onSaveAll(): void {
    console.table(this.auditlogsToBeSaved);
    if (this.auditlogsToBeSaved.length != 0) {
        this.defaultService.updateMoreAuditlog(this.auditlogsToBeSaved).subscribe(() => {
            this.toast.success("auditlogs updated");
            this.router.navigate(['/navigation/konnektor-view']);
          },
          (error:any) => {
            this.toast.error("auditlogs could not be updated.");
          });
    }
  }

  // proba push to remote

  public mapUserActionToString(action: AuditLogMessageDTO): string {
    return mapToString(action);
  }

  public onUpdateCell(id: number, rowIndex: number, name: string, event: any): void {
    const value = event.target.value;
    this.editable[rowIndex + name] = false;
    this.auditlogs.filter( log => log.id == id)[0].timestamp = value.toString() + PAD_TIME;
    this.auditlogsToBeSaved.push(this.auditlogs.filter( log => log.id == id)[0]);
  }

  public convertISODateToString(date: string): string {
    return this.datePipe.transform(Date.now(),'yyyy-MM-dd');
  }

}


