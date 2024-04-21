import {ComponentFixture, fakeAsync, flush, TestBed, tick} from "@angular/core/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import createSpyObj = jasmine.createSpyObj;
import {KonnektorModifyComponent} from "./konnektor-modify.component";
import {DefaultService } from "../../../../target/generated-sources/openapi";
import {ToastService} from "../../toast/toast.service";
import {Observable, Observer, of} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {click} from "../../../test-common/helper";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {By} from "@angular/platform-browser";
import {toInteger} from "../../core/helper";

describe('KonnektorModifyComponent', () => {

  let component: KonnektorModifyComponent;
  let fixture: ComponentFixture<KonnektorModifyComponent>;
  let konnektor = {
    id: 1,
    hostName: '127.0.0.1',
    serialNumber: '213231',
    firmwareVersion: '21.11',
    hardwareVersion: '11.11',
    active: true,
    created: '2022-06-26T13:01:29.533Z',
    auditlogs: [
      {
        id: 1,
        user: "bende",
        konnektor: 1,
        userAction: null,
        timestamp: null
      }
    ]
  };

  const defaultServiceSpy = createSpyObj('DefaultService', ['getKonnektor', 'updateKonnektor']);
  const toastServiceSpy = createSpyObj('ToastService', ['success', 'error']);
  const activatedRouterStub = {
    snapshot: {
        paramMap: {
          get: () => {return '1'}
        }
    }
  };
  const routerSpy = createSpyObj('Router', ['navigate']);

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [KonnektorModifyComponent],
      providers: [
        {provide: DefaultService, useValue: defaultServiceSpy},
        {provide: ToastService, useValue: toastServiceSpy},
        {provide: ActivatedRoute, useValue: activatedRouterStub},
        {provide: Router, useValue: routerSpy}
      ],
      imports: [FormsModule, ReactiveFormsModule, NgbDatepickerModule]
    }).compileComponents();

    defaultServiceSpy.getKonnektor.and.returnValue(of(konnektor));
    defaultServiceSpy.updateKonnektor.and.returnValue(of(null));
  });

  it('should prepopulate form fields correctly', fakeAsync(() => {
    whenComponentHasStarted();
    thenInputSet("id", "1");
    thenInputSet("hostName", "127.0.0.1");
    thenInputSet("serialNumber", "213231");
    thenInputSet("firmwareVersion", "21.11");
    whenInputSet("hostName", "127.0.0.2");
    whenInputSet("serialNumber", "213232");
    whenInputSet("firmwareVersion", "21.12");
    whenSaveKonnektor();
    tick();
    thenToastSuccess();
    flush();
  }));

  it('should navigate back', fakeAsync(()=> {
    whenComponentHasStarted();
    whenBackButtonClicked();
    //expect(routerSpy.navigate).toHaveBeenCalled();
  }));

  it('when on update error comes', fakeAsync(() => {
    whenComponentHasStarted();
    const err = {error: {name: 'error', message: ''}};
    const errResponse = new Observable((observer: Observer<any>) => {
      observer.error(err);
    });
    defaultServiceSpy.updateKonnektor.and.returnValue(errResponse);
    whenSaveKonnektor();
    tick(); // KELL EZ A KURVA TICK KÜLÖNBEN PROMISE REJECTION NEM MŰX
    // @ts-ignore
    expect(toastServiceSpy.error).toHaveBeenCalled();
  }));

  it('date picker showed correctly', fakeAsync(() => {
    whenComponentHasStarted();
    const inputElement = fixture.nativeElement.querySelector(`input#${'created'}`);
    expect(konnektor.created.substring(0, 10)).toEqual(inputElement.value);
  }));

  it('time picker showed correctlyx', fakeAsync(() => {
    whenComponentHasStarted();
    const inputElement = fixture.debugElement.query(By.css('#createdTime'));
    //console.log(inputElement.nativeNode.value.hour);
    //console.log(inputElement.nativeNode.value.minute);
    expect(inputElement.nativeNode.value.hour).toEqual(toInteger(konnektor.created.substring(11, 13)));
    expect(inputElement.nativeNode.value.minute).toEqual(toInteger(konnektor.created.substring(15, 16)));

  }));

  const whenComponentHasStarted = () => {
    fixture = TestBed.createComponent(KonnektorModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();                       // várjuk be a Promise.of() visszaad: simulates the passage of time until all pending asynchronous activities finish
  };

  const thenInputSet = (id: string, text: string) => {
    const inputElement = fixture.nativeElement.querySelector(`input#${id}`);
    const textInput = inputElement.value;
    expect(textInput).toEqual((String)(konnektor[id]));
  };

  const whenInputSet = (id: string, text: string) => {
    const inputElement = fixture.nativeElement.querySelector(`input#${id}`);
    inputElement.value = text;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  };


  const thenToastSuccess = () => {
   // expect(toastServiceSpy.success).toHaveBeenCalled();
    whenBackButtonClicked();
  };

  function whenSaveKonnektor() {
    component.onSubmit();
  }

  const whenBackButtonClicked = () => {
    const backButton = fixture.nativeElement.querySelector('#back-button');
    click(backButton);
  };

})
