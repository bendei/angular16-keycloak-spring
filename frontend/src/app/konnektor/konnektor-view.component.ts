import {Component, OnInit} from '@angular/core';
import {DefaultService, KonnektorDTO } from '../../../target/generated-sources/openapi';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToastService} from "../toast/toast.service";
import {HttpErrorResponse} from "@angular/common/http";

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
  }

  public filterForm(): void {
    const id = this.konnektorFilterForm.get('id')?.value;
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

  private async loadKonnektors(hostname: string, serialNumber: string, firmwareVersion: string, hardwareVersion: string, created: string) {
    this.loading = true;

    await this.defaultService.getAllKonnektors(hostname, serialNumber, firmwareVersion, hardwareVersion, created).toPromise().then( result => {
      this.konnektors = [...result];
    }).catch( error => {
      this.toast.error((error as HttpErrorResponse).message);
    }).finally( () => this.loading = false);
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

}
