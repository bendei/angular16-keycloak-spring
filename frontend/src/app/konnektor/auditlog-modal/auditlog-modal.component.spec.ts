import {AuditlogModalComponent} from "./auditlog-modal.component";
import {ComponentFixture, fakeAsync, flush, TestBed, tick} from "@angular/core/testing";
import {AuditLogDTO, AuditLogMessageDTO, KonnektorDTO} from "../../../../target/generated-sources/openapi";
import {KonnektorModifyComponent} from "../konnektor-modify/konnektor-modify.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbActiveModal, NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {createCurrentDateTimeISOString} from "../../core/helper";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";


describe('AuditLogModal', () => {

  let component: AuditlogModalComponent;
  let fixture: ComponentFixture<AuditlogModalComponent>;

  const USER_1: string = 'bende';
  const USER_2: string = 'sas';
  const activeModal = {};
  const konnektor: KonnektorDTO = {id: 1, hostName: '123.22.33.2', validUntil: '2022-12-21T13:01:29.533Z', serialNumber: '2222', created: createCurrentDateTimeISOString(), active: true,
      hardwareVersion: '3333', firmwareVersion: '4444'};


  let auditlogs: AuditLogDTO[] = [
    {id: 1, user: USER_1, userAction: AuditLogMessageDTO.UserLogin, konnektor: 1, timestamp: '2022-06-21T13:01:29.533Z'},
    {id: 2, user: USER_1, userAction: AuditLogMessageDTO.UserLogout, konnektor: 1, timestamp: '2022-06-21T13:01:39.533Z'},
    {id: 3, user: USER_2, userAction: AuditLogMessageDTO.CreateUser, konnektor: 1, timestamp: '2022-06-21T13:02:29.533Z'},
    {id: 4, user: USER_2, userAction: AuditLogMessageDTO.UpdateUserData, konnektor: 1, timestamp: '2022-06-21T13:03:29.533Z'}
  ];

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [KonnektorModifyComponent],
      providers: [
        {provide: NgbActiveModal, useValue: activeModal},
      ],
      imports: [FormsModule, ReactiveFormsModule, NgbDatepickerModule, NgxDatatableModule]
    }).compileComponents();

  });

  fit('should show table', fakeAsync(() => {
    whenComponentHasStarted();
    const tblElement = fixture.nativeElement.querySelector(`#auditlogsDataTable`);
    expect(tblElement.rows).toHaveSize(4);
    expect(tblElement.rows[0].id).toEqual(1);
    expect(tblElement.rows[0].user).toEqual('bende');
  }));

  const whenComponentHasStarted = () => {
    fixture = TestBed.createComponent(AuditlogModalComponent);
    component = fixture.componentInstance;
    component.auditlogs = auditlogs;
    fixture.detectChanges();
  };

})
