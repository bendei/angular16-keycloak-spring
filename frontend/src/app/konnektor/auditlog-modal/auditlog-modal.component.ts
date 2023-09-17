import {AfterViewChecked, Component, DoCheck, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AuditLogDTO, AuditLogMessageDTO, DefaultService} from "../../../../target/generated-sources/openapi";
import {mapToString} from '../../core/AuditLogMessageMapper';
import {DatePipe} from "@angular/common";
import {ToastService} from "../../toast/toast.service";
import {createCurrentDateTimeISOString} from "../../core/helper";
import {DatatableComponent} from "@swimlane/ngx-datatable";

const PAD_TIME = "T01:00:00.59";

@Component({
  selector: 'app-modal-content',
  templateUrl: './auditlog-modal.component.html',
  providers: [DatePipe]
})
export class AuditlogModalComponent implements OnInit, OnChanges, DoCheck, AfterViewChecked {

  public fontSizePx = 15;
  public title = 'dynamic property binding';
  public templateString = '';
  private incrementator = 0;
  public auditlogs: Array<AuditLogDTO> = [];
  private auditlogsToBeUpdated: AuditLogDTO[] = [];
  private auditlogsToBeSaved: AuditLogDTO[] = [];
  public editable = {}; // empty object type, with later members editable[2]=true;
  public messagesTypes: AuditLogMessageDTO[] = [];
  private latestNewIdForAuditlog = -1;

  // just for practice
  private sorozat: (string | number)[] = [2, 3, 'eee'];

  @ViewChild('auditlogsDataTable', {static: false})
  public auditlogsDataTable!: DatatableComponent;

  constructor(public activeModal: NgbActiveModal, private datePipe: DatePipe, private readonly defaultService: DefaultService,
              private readonly toast: ToastService) {}

  ngOnInit(): void {
    this.messagesTypes = Object.values(AuditLogMessageDTO);
    console.log('-----ngOnInit:' + this.auditlogsDataTable);
    console.log(this.sorozat);

  }

  ngDoCheck(): void {
    console.log(".....onDoCheck");
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(".....ngOnChanges");
  }

  public templateMethodOne(username: string): number {
    ++this.incrementator;
    console.log("----templateMethodOne called: " + this.incrementator);
    return username.length;
  }

  public changeTitle() {
    this.title = "dddddd";
  }

  public inc() {
    ++this.fontSizePx;
  }

  public dec() {
    --this.fontSizePx;
  }

  public printlogUser(user: string) {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@printlogUser");
    return user + "---";
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
    this.auditlogsDataTable.rows = this.auditlogs;
  }

  public async onSaveAll() {

    if (this.auditlogsToBeUpdated.length != 0) {
        await this.defaultService.updateMoreAuditlog(this.auditlogsToBeUpdated).toPromise().then(() => {
            this.toast.success("auditlogs updated");
            //this.router.navigate(['/navigation/konnektor-view']);
          })
          .catch((err) => {
            console.log('------ ' + err);
            this.toast.error("auditlogs could not be updated.");
          });
    }

    // newly created logs saving
    if (this.auditlogsToBeSaved.length != 0) {
      await this.defaultService.createAuditLog(this.auditlogsToBeSaved).toPromise().then( () => {
          this.toast.success("auditlogs updated");
          //this.router.navigate(['/navigation/konnektor-view']);
          // DEV itt kellene a visszaadott id-vel updatelni a tablet
        })
        .catch(() => {
          this.toast.error("auditlogs could not be updated.");
        });
    }

  }

  public removeAuditlog(log: AuditLogDTO): void {
    // persisted log
    if (log.id >= 0) {
      this.defaultService.deleteAuditlog(log.id.toString()).subscribe(() => {
          this.toast.success("auditlogs deleted");
          //this.router.navigate(['/navigation/konnektor-view']);
        },
        () => {
          this.toast.error("auditlogs could not be deleted.");
        });
    }
      // newly created but not saved logs
      this.auditlogs = this.auditlogs.filter( (l) => l.id != log.id);
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

  ngAfterViewChecked(): void {
    console.log("#######AfterViewChecked");
  }

}


