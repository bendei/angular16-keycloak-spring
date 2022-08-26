import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AuditLogDTO, AuditLogMessageDTO, DefaultService} from "../../../../target/generated-sources/openapi";
import {mapToString} from '../../core/AuditLogMessageMapper';
import {DatePipe} from "@angular/common";
import {ToastService} from "../../toast/toast.service";
import {Router} from "@angular/router";
import {createCurrentDateTimeISOString} from "../../core/helper";
import {DatatableComponent} from "@swimlane/ngx-datatable";

const PAD_TIME = "T01:00:00.59";

@Component({
  selector: 'app-modal-content',
  templateUrl: './auditlog-modal.component.html',
  providers: [DatePipe]
})
export class AuditlogModalComponent implements OnInit {

  public auditlogs: Array<AuditLogDTO> = [];
  private auditlogsToBeUpdated: AuditLogDTO[] = [];
  private auditlogsToBeSaved: AuditLogDTO[] = [];
  public editable = {}; // empty object type, with later members editable[2]=true;
  public messagesTypes: AuditLogMessageDTO[] = [];
  private latestNewIdForAuditlog = -1;

  @ViewChild('auditlogsDataTable', {static: false})
  private auditlogsDataTable: DatatableComponent;

  constructor(public activeModal: NgbActiveModal, private datePipe: DatePipe, private readonly defaultService: DefaultService, private readonly toast: ToastService,
              private readonly router: Router) {}

  ngOnInit(): void {
    this.messagesTypes = Object.values(AuditLogMessageDTO);
  }

  public onAddNew(): void {

    let newLog = {
      id: this.latestNewIdForAuditlog,
      user: '',
      konnektor: 1,
      userAction: AuditLogMessageDTO.CreateUser,
      timestamp: createCurrentDateTimeISOString()
    };

    this.auditlogs.push(newLog);
    this.auditlogsToBeSaved.push(newLog);
    this.editable[this.latestNewIdForAuditlog + '-user'] = true;
    --this.latestNewIdForAuditlog;
  }

  public onSaveAll(): void {

    if (this.auditlogsToBeUpdated.length != 0) {
        this.defaultService.updateMoreAuditlog(this.auditlogsToBeUpdated).subscribe(() => {
            this.toast.success("auditlogs updated");
            this.router.navigate(['/navigation/konnektor-view']);
          },
          (error:any) => {
            this.toast.error("auditlogs could not be updated.");
          });
    }

    // newly created logs saving
    this.defaultService.createAuditLog(this.auditlogsToBeSaved).subscribe( () => {
        this.toast.success("auditlogs created");
        this.router.navigate(['/navigation/konnektor-view']);
      },
      (error:any) => {
        this.toast.error("auditlogs could not be created.");
    });

  }

  public removeAuditlog(log: AuditLogDTO, rowIndex: number): void {
    // newly created but not saved logs
    if (log.id == 0) {
      this.auditlogs.splice(rowIndex, 1);
    } else {  // persisted log

    }
  }

  public mapUserActionToString(action: AuditLogMessageDTO): string {
    return mapToString(action);
  }

  public onUpdateCell(id: number, name: string, event: any): void {
    const value = event.target.value;
    this.editable[id + name] = false;

    switch (name) {
      case "-timestamp":
        this.auditlogs.filter( log => log.id == id)[0].timestamp = value.toString() + PAD_TIME;
        break;
      case "-useraction":
        this.auditlogs.filter(log => log.id == id)[0].userAction = value;
        break;
      case "-user":
        this.auditlogs.filter(log => log.id == id)[0].user = value;
        break;
    }

    if (id >= 0) {
      this.auditlogsToBeUpdated.push(this.auditlogs.filter(log => log.id == id)[0]);
    }
  }

  public convertISODateToString(date: string): string {
    return this.datePipe.transform(date,'yyyy-MM-dd');
  }

}


