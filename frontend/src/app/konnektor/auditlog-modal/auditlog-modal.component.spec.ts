import {AuditlogModalComponent} from "./auditlog-modal.component";
import {ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {AuditLogDTO, AuditLogMessageDTO, DefaultService } from "../../../../target/generated-sources/openapi";
import {KonnektorModifyComponent} from "../konnektor-modify/konnektor-modify.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbActiveModal, NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {DatePipe} from "@angular/common";
import createSpyObj = jasmine.createSpyObj;
import {ToastService} from "../../toast/toast.service";
import {Router} from "@angular/router";


describe('AuditLogModal', () => {

  let component: AuditlogModalComponent;
  let fixture: ComponentFixture<AuditlogModalComponent>;

  const USER_1: string = 'bende';
  const USER_2: string = 'sas';
  const activeModal = {};
  const defaultServiceSpy = createSpyObj('DefaultService', ['updateAuditlog']);
  const toastServiceSpy = createSpyObj('ToastService', ['success', 'error']);
  const defaultDatePipeSpy = createSpyObj('DatePipe', ['transform']);
  const routerSpy = createSpyObj('Router', ['navigate']);

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
        {provide: DatePipe, useValue: defaultDatePipeSpy},
        {provide: DefaultService, useValue: defaultServiceSpy},
        {provide: ToastService, useValue: toastServiceSpy},
        {provide: Router, useValue: routerSpy}
      ],
      imports: [FormsModule, ReactiveFormsModule, NgbDatepickerModule, NgxDatatableModule]
    }).compileComponents();

  });

  it('should show table', fakeAsync(() => {
    whenComponentHasStarted();
    const tblElement = fixture.nativeElement.querySelector(`#auditlogsDataTable`);
    expect(tblElement.rows).toHaveSize(4);  // itt mint js objektumra hivatkozunk
    expect(tblElement.rows[0].id).toEqual(1);
    expect(tblElement.rows[0].user).toEqual('bende');
  }));

  /*it('user input value should change', fakeAsync(() => {
    whenComponentHasStarted();
    tick();
    const tblElement = fixture.nativeElement.querySelector(`#auditlogsDataTable`);
    expect(tblElement.rows[0].id).toEqual(1);
    expect(tblElement.rows[0].user).toEqual('bende');
    tick();


  }));*/

  const whenComponentHasStarted = () => {
    fixture = TestBed.createComponent(AuditlogModalComponent);
    component = fixture.componentInstance;
    component.auditlogs = auditlogs;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  };



})
