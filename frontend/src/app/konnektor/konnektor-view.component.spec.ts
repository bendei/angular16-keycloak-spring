import {KonnektorViewComponent} from './konnektor-view.component';
import {ComponentFixture, fakeAsync, flush, TestBed, tick} from "@angular/core/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import createSpyObj = jasmine.createSpyObj;
import {DefaultService, KonnektorDTO} from "../../../target/generated-sources/openapi";
import {of} from "rxjs";
import {click} from "../../test-common/helper";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {ToastService} from "../toast/toast.service";


describe('KonnektorViewComponent', () => {

  let component: KonnektorViewComponent;
  let fixture: ComponentFixture<KonnektorViewComponent>;

  const defaultServiceSpy = createSpyObj('DefaultService', ['getAllKonnektors']);
  const toastServiceSpy = createSpyObj('ToastService', ['error', 'success'])
  let konnektors: KonnektorDTO[] = [];

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [KonnektorViewComponent],
      providers: [
        {provide: DefaultService, useValue: defaultServiceSpy},
        {provide: ToastService, useValue: toastServiceSpy}
      ],
      imports: [FormsModule, ReactiveFormsModule, NgxDatatableModule]
    }).compileComponents();
    defaultServiceSpy.getAllKonnektors.and.returnValue(of(konnektors));
  });

  it('initial loading konnektors successful', fakeAsync(() => {
    givenKonnektors();                // beallitjuk a spy altal visszaadando értékeket
    whenComponentHasStarted();        // és ne a befaoreEach()ben mert akkor a ngInit lefut közben még a spy nem is tud értékeket visszaadni, igy viszont igen
    tick();                           // várjuk be a Promise.of() visszaad: simulates the passage of time until all pending asynchronous activities finish
    expect(component.konnektors.length).toBe(2);
  }));

  it('should display initially loaded konnektors number', fakeAsync(() => {
    givenKonnektors();                // beallitjuk a spy altal visszaadando értékeket
    whenComponentHasStarted();        // és ne a befaoreEach()ben mert akkor a ngInit lefut közben még a spy nem is tud értékeket visszaadni, igy viszont igen
    tick();                           // várjuk be a Promise.of() visszaad: simulates the passage of time until all pending asynchronous activities finish
    const text = fixture.nativeElement.querySelector('#konnektorSize').textContent;
    expect(component.konnektors.length).toBe(2);
    expect(text).toContain(component.konnektors.length);
  }));

  // emulates form input value settings and then form submit
  it('should filter by serialNumber with one konnektor', fakeAsync(() => {
    givenKonnektorsForFiltering();
    whenComponentHasStarted();
    whenInputSet("serialNumber", "213231");
    whenFilterButtonClicked();
    thenSingleKonnektorFound();
    flush();              // https://stackoverflow.com/questions/58416969/angular-karma-unit-test-error-1-timers-still-in-the-queue
  }));

  it('should clear form', fakeAsync(() => {
    whenComponentHasStarted();
    whenInputSet("hostName", "hhh");
    whenInputSet("serialNumber", "sss");
    whenInputSet("firmwareVersion", "fff");
    whenInputSet("id", "111");
    whenClearButtonClicked();
    thenInputCleared("hostName");
    thenInputCleared("serialNumber");
    thenInputCleared("firmwareVersion");
    thenInputCleared("id");
    flush();
  }));

  it('should show table of 5 rows', fakeAsync(() => {
    givenKonnektorsForFiltering();
    whenComponentHasStarted();
    tick();
    thenTableRendered();
    flush();
  }));

  const whenComponentHasStarted = () => {
    fixture = TestBed.createComponent(KonnektorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();                       // várjuk be a Promise.of() visszaad: simulates the passage of time until all pending asynchronous activities finish
    fixture.detectChanges();      // hogy az inputok is renderelödjenek
  };

  const whenInputSet = (id: string, text: string) => {
    const inputElement = fixture.nativeElement.querySelector(`input#${id}`);
    inputElement.value = text;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  };

  const thenSingleKonnektorFound = () => {
    const serialNumberInput = fixture.nativeElement.querySelector('input#serialNumber');
    expect(serialNumberInput.value).toBe("213231");
    expect(component.konnektors.length).toBe(1);
  };

  const thenInputCleared = (id: string) => {
    const inputElement = fixture.nativeElement.querySelector(`input#${id}`);
    expect(inputElement.value === '').toBeTrue()
  };

  const whenFilterButtonClicked = () => {
    const filterButton = fixture.nativeElement.querySelector('#filter-button');
    click(filterButton);
  };

  const whenClearButtonClicked = () => {
    const filterButton = fixture.nativeElement.querySelector('#clear-button');
    click(filterButton);
  };

  const thenTableRendered = () => {
    const rows = fixture.nativeElement.querySelectorAll('.datatable-body-row');
    expect(rows.length == konnektors.length).toBeTrue();
  };

  const givenKonnektors = () => {
    konnektors.length = 0;  // mindig töröljuk a arrayt
    konnektors.push({
      id: 1,
      hostName: '127.0.0.1',
      serialNumber: '213231',
      firmwareVersion: '21.11',
      hardwareVersion: '11.11',
      active: true,
      created: '2022-06-26T13:01:29.533Z'
    });
    konnektors.push(
    {
      id: 2,
      hostName: '127.0.0.2',
      serialNumber: '213232',
      firmwareVersion: '21.12',
      hardwareVersion: '11.12',
      active: false,
      created: '2022-06-26T13:01:29.533Z'
    });
  }

  const givenKonnektorsForFiltering = () => {
    konnektors.length = 0;  // mindig töröljuk a arrayt
    konnektors.push({
        id: 1,
        hostName: '127.0.0.1',
        serialNumber: '213231',
        firmwareVersion: '21.11',
        hardwareVersion: '11.11',
        active: true,
        created: '2022-06-26T13:01:29.533Z'
      });
  }

});
