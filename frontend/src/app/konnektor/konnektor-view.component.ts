import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {DefaultService, KonnektorDTO} from '../openapi-generated-sources';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastService} from "../toast/toast.service";
import {lastValueFrom, Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {KonnektorViewChildComponent} from "./konnektor-view-child.component";
import {PureDatePipe} from "../pipes/pureDatePipe";
import {CommonModule} from "@angular/common";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {KonnektorDropdownComponent} from "./konnektor-dropdown/konnektor-dropdown.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {KonnektorRemoveComponent} from "./konnektor-remove/konnektor-remove.component";
import {RouterModule} from "@angular/router";
import {MockService} from "../mock/mock.service";

@Component({
  standalone: true,
  selector: 'konnektor-view',
  templateUrl: './konnektor-view.component.html',
  styleUrls: ['./konnektor-view.component.css'],
  imports: [PureDatePipe, KonnektorViewChildComponent,
    CommonModule, FormsModule, ReactiveFormsModule, NgxDatatableModule, KonnektorDropdownComponent, NgbModule, KonnektorRemoveComponent, RouterModule
  ],
  providers: [FormBuilder, ToastService]

})
export class KonnektorViewComponent implements OnInit {
  readonly headerHeight = 50;
  readonly rowHeight = 50;

  loaded = false;
  konnektorFilterForm!: FormGroup;
  konnektors: KonnektorDTO[] = [];
  isEditMode: string[] = [];

  // for pipe
  maiDatum: Date = new Date();

  isApu: boolean = false;

  bende: Bende = {
    nevem: "Pisti",
    korom: 51,
    okos: true,
    getValami(myarg) {
      return "myarg:" + myarg;
    }
  };

  pistike!: Bende;

  bendeClone: Bende;
  apu: Apu;

  @ViewChild(KonnektorViewChildComponent)
  private konnektorViewChildComponent!: KonnektorViewChildComponent;

  constructor(private readonly defaultService: DefaultService, private readonly formBuilder: FormBuilder, private renderer: Renderer2,
              private mockService: MockService) {
    this.bendeClone = {...this.bende, nevem: "enenen"};
    this.apu = {
      kora: 80,
      neve: "Apuka",
      lakik: true,
      logout(): string {
        return this.kora + " --- " + this.neve
      },
      sorozat: []
    };

    this.isApu = this.apu instanceof Valami;

  }

  ngOnInit(): void {

    this.cretaeForm();
    this.loadKonnektors();
    const pisti: PistiFunction = function(text: string) {return text};
    const feri: PistiFunction = (text: string) => {return text}
    console.log('------ ' + pisti("pisti implementing function type interface"));
    console.log('------ ' + feri("feri implementing function type interface lambda"));


    // deconstructing object properties
    const {kora : korom} = this.apu;
    console.log("deconstructing: " + korom);

  }

  public filterForm(): void {
    const hostName = this.konnektorFilterForm.get('hostName')?.value;
    const serialNumber = this.konnektorFilterForm.get('serialNumber')?.value;
    const firmwareVersion = this.konnektorFilterForm.get('firmwareVersion')?.value;
    const hardwareVersion = this.konnektorFilterForm.get('hardwareVersion')?.value;
    const created: string = '';
    this.loadKonnektors(hostName, serialNumber, firmwareVersion, hardwareVersion, created);
  }

  public clearForm(): void {
    this.konnektorFilterForm.reset();

    console.log("hostName: " + this.konnektorFilterForm.get('hostName')?.value);
  }

  public containsWhitespace(): boolean {
    return (this.konnektorFilterForm.get("hostName")?.value.indexOf(' ')) > 0;
  }

  public editMode(index: string) {
    this.isEditMode[index] = !this.isEditMode[index];
  }

  public onUpdateHostname(event: any, rowIndex: string, dto: KonnektorDTO) {
    console.log("onUpdateHostname");
    this.isEditMode[rowIndex] = false;
    const reqDto: KonnektorDTO = {
      id: dto.id,
      hostName : event.target.value
    };
    this.defaultService.updateKonnektorHostname(String(reqDto.id), reqDto).toPromise().then(
      () => {
        this.filterForm();
       // this.toast.success("konnektor hostname updated")
      }
      /*.catch(() => {
        this.toast.error("konnektor hostname could not be updated.");
      }*/
      );
  }

  private loadAndMapKonnektors() {
    console.log('------loadAndMapKonnektors ');
    let innerkonnektors: KonnektorDTO[] = [];
    let mapKonnektors: KonnektorMapperDTO[] = [];

    this.defaultService.getAllKonnektors()
      .pipe(
        map( (konnektorArray) =>
          konnektorArray.map(konn => ({  // itt már kell a ( és a { !!!
            ...konn,
            hostNameAndSerial: `${konn.hostName} - ${konn.serialNumber}`,
            mappedDate: new Date().toISOString()
          }))
        )
      )
      .subscribe( (konnektorsMapped) => {
        console.log('------ ' + konnektorsMapped[0].hostNameAndSerial + ", :" + konnektorsMapped[0].hostName + ", mappedDate: " + konnektorsMapped[0].mappedDate);
      });
  }

  // überarbeitet, da toPromise is deprecated
  private async loadKonnektors(hostname?: string, serialNumber?: string, firmwareVersion?: string, hardwareVersion?: string, created?: string) {

    this.loaded = false;
    try {
      const allKonnektors$ = this.defaultService.getAllKonnektors(hostname, serialNumber, firmwareVersion, hardwareVersion, created);
      this.konnektors = await lastValueFrom(allKonnektors$);
      console.table(this.konnektors);
    } catch(error) {
      console.log("......................ERROR: " + error.message);
    }
    this.loaded = true;

    /*const $allKonnektors = this.defaultService.getAllKonnektors(hostname, serialNumber, firmwareVersion, hardwareVersion, created);
    lastValueFrom($allKonnektors).then(
      result => {
        console.log("...............RESULT");
        this.konnektors = result
      },
      error => {
        console.log("......................ERROR");
        this.renderer.setStyle(this.errorStrip.nativeElement, 'visibility', 'visible');
      }
      /!*result => {
        console.log(result);
        this.konnektors = result
      },
      error => {
         this.renderer.setStyle(this.errorStrip.nativeElement, 'visibility', 'visible');
      }*!/
    )
      .finally(
        () =>  {this.loaded = true}
      )*/

  }

  private cretaeForm(): void {
    this.konnektorFilterForm = this.formBuilder.group({
      id: [''],
      hostName: [''],
      serialNumber: [''],
      firmwareVersion: [''],
      hardwareVersion: ['']
    });
  }

  private gyakorlat(): void {
    let obs: Observable<Valami> = of(new Valami("www", "eee"));
    let obsInter: Observable<Kakukk> = of({payload: "interpayload", nev: "internev"});
    obs.pipe(
      map((res) => res.payload)
    ).subscribe((res) => console.log('----obs-map((res) => res[\'payload\'])- ' + res));
  }

  getMeOut(): string {
    return "ausdruck";
  }

  public useViewChild() {
  this.konnektorViewChildComponent.incrementUseViewChild();
  }
}

class Valami implements IValami {
  payload: string;
  nev: string;

  szine?: string;
  constructor(p: string, n: string) {
    this.payload = p;
    this.nev = n;
  }
}

interface IValami {
  szine?: string;
}

interface Kakukk {
  payload: string,
  nev?: string
}

interface KonnektorMapperDTO extends KonnektorDTO {
  hostNameAndSerial: string;
  mappedDate: Date
}

interface PistiFunction {
  (text: string): string;
}

interface MyArray {
  [index: number]: PistiFunction;
}

interface Bende {
  nevem: string;
  korom?: number;
  readonly okos: boolean;
  getValami(myarg: string): string;
}

interface Apu {
  neve: string;
  kora?: number;
  readonly lakik: boolean;
  logout(): string;
  sorozat?: Sorozat;
}

interface Sorozat {
  [index: number]: string
}


