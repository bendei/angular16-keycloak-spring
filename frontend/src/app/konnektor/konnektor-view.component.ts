import {Component, OnInit} from '@angular/core';
import {DefaultService, KonnektorDTO } from '../../../target/generated-sources/openapi';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToastService} from "../toast/toast.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'konnektor-view',
  templateUrl: './konnektor-view.component.html',
  styleUrls: ['./konnektor-view.component.css'],
})
export class KonnektorViewComponent implements OnInit {

  readonly headerHeight = 50;
  readonly rowHeight = 50;
  loading = true;
  konnektorFilterForm!: FormGroup;
  konnektors: KonnektorDTO[] = [];
  isEditMode: string[] = [];


  constructor(private readonly defaultService: DefaultService, private readonly formBuilder: FormBuilder, private readonly toast: ToastService) {
  }

  ngOnInit(): void {
    this.loadKonnektors(null, null, null, null, null);
    this.cretaeForm();
    this.loadAndMapKonnektors();

    const pisti: PistiFunction = function(text: string) {return text};
    const feri: PistiFunction = (text: string) => {return text}
    console.log('------ ' + pisti("pisti implementing function type interface"));
    console.log('------ ' + feri("feri implementing function type interface lambda"));

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
  }

  public containsWhitespace(): boolean {
    return (this.konnektorFilterForm.get("hostName").value?.indexOf(' ')) > 0;
  }

  public editMode(index: string) {
    this.isEditMode[index] = !this.isEditMode[index];
  }

  public async onUpdateHostname(event: any, rowIndex: string, dto: KonnektorDTO) {
    this.isEditMode[rowIndex] = false;
    const reqDto: KonnektorDTO = {
      id: dto.id,
      hostName : event.target.value
    };
    this.defaultService.updateKonnektorHostname(String(reqDto.id), reqDto).toPromise().then(
      () => {
        this.filterForm();
        this.toast.success("konnektor hostname updated")
      })
      .catch(() => {
        this.toast.error("konnektor hostname could not be updated.");
      }
    );
  }

  private loadAndMapKonnektors() {
    console.log('------loadAndMapKonnektors ');
    let innerkonnektors: KonnektorDTO[] = [];
    let mapKonnektors: KonnektorMapperDTO[] = [];

    /*this.defaultService.getAllKonnektors().subscribe((konnektors) => {
      innerkonnektors = konnektors;
      console.log('------ ' + innerkonnektors.length);

      mapKonnektors= innerkonnektors.map((dto) => {
       // let mappedKonnektor: KonnektorMapperDTO = {hostNameAndSerial: "www"};
        return {...dto, hostNameAndSerial: `${dto.hostName} - ${dto.serialNumber}`};
      });
      console.log('------ hostNameAndSerial:' + mapKonnektors[0].hostNameAndSerial + ", hostName:" + mapKonnektors[0].hostName);
    });*/

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

  private async loadKonnektors(hostname: string, serialNumber: string, firmwareVersion: string, hardwareVersion: string, created: string) {
    this.loading = true;

    await this.defaultService.getAllKonnektors(hostname, serialNumber, firmwareVersion, hardwareVersion, created).toPromise()
    .then( result => {
        this.konnektors = [...result];
      })
    .catch( error => {
      for (let pr in (error as HttpErrorResponse)) {
        console.log(`property name: ${pr}, value: ${error[pr]}`);
      }
      this.toast.error((error as HttpErrorResponse).message);
    })
     .finally( () => this.loading = false);
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



}

class Valami {
  payload: string;
  nev: string;

  constructor(p: string, n: string) {
    this.payload = p;
    this.nev = n;
  }
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

