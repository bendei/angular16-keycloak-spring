import {Component, OnInit} from '@angular/core';
import {DefaultService, KonnektorDTO, UpdateKonnektorHostnameRequestDTO} from '../../../target/generated-sources/openapi';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToastService} from "../toast/toast.service";

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
    const hostname = this.konnektorFilterForm.get('hostname')?.value;
    const serialNumber = this.konnektorFilterForm.get('serialNumber')?.value;
    const firmwareVersion = this.konnektorFilterForm.get('firmwareVersion')?.value;
    const hardwareVersion = this.konnektorFilterForm.get('hardwareVersion')?.value;
    const created: string = '';
    this.loadKonnektors(hostname, serialNumber, firmwareVersion, hardwareVersion, created);
  }

  public clearForm(): void {
    this.konnektorFilterForm.reset();
  }

  public containsWhitespace(): boolean {
    return (this.konnektorFilterForm.get("hostname").value?.indexOf(' ')) > 0;
  }

  public editMode(index: string) {
    this.isEditMode[index] = !this.isEditMode[index];
  }

  public onUpdateHostname(event: any, rowIndex: string, dto: KonnektorDTO): void {
    this.isEditMode[rowIndex] = false;
    let reqDto: UpdateKonnektorHostnameRequestDTO = {konnektorId: dto.id, hostname : event.target.value};
    this.defaultService.updateKonnektorHostname(reqDto).subscribe(
      () => {
        this.filterForm();
        this.toast.success("konnektor hostname updated")
      },
      (error:any) => {
        this.toast.error("konnektor hostname could not be updated.");
      }
    );
  }

  private async loadKonnektors(hostname: string, serialNumber: string, firmwareVersion: string, hardwareVersion: string, created: string) {
    this.loading = true;
    const konns = await this.defaultService.getAllKonnektors(hostname, serialNumber, firmwareVersion, hardwareVersion, created).toPromise();
    this.konnektors = [...konns];
    this.loading = false;
  }

  private cretaeForm(): void {
    this.konnektorFilterForm = this.formBuilder.group({
      id: [''],
      hostname: [''],
      serialNumber: [''],
      firmwareVersion: [''],
      hardwareVersion: ['']
    });
  }

}
