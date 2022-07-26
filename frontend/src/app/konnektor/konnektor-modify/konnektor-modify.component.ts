import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DefaultService, KonnektorDTO} from "../../../../target/generated-sources/openapi";
import {ToastService} from "../../toast/toast.service";

@Component({
  selector: 'app-konnektor-modify',
  templateUrl: './konnektor-modify.component.html'
})
export class KonnektorModifyComponent implements OnInit {

  private konnektorId;
  private konnektor: KonnektorDTO;
  public konnektorForm!: FormGroup;

  constructor(private readonly fb: FormBuilder, private route: ActivatedRoute, private readonly defaultService: DefaultService, private readonly toast: ToastService,
              private readonly router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
    this.konnektorId = this.route.snapshot.paramMap.get('id');

    if(this.konnektorId) {
      this.defaultService.getKonnektor(this.konnektorId).subscribe(konnektor => {
        this.konnektor = konnektor;
        this.loadFormData();
      });
    }

  }

  public onSubmit(): void {
    const {id, hostName, serialNumber, firmwareVersion, hardwareVersion, active, created} = this.konnektorForm.getRawValue();

    this.defaultService.updateKonnektor(id, {
      id, hostName, serialNumber, firmwareVersion, hardwareVersion, active, created}).subscribe(
      () => {
        this.toast.success("konnektor updated");
        this.router.navigate(['/navigation/konnektor-view']);
      },
      (error:any) => {
        this.toast.error("konnektor could not be updated.");
      }
    );
  }

  public onBack(): void {
    this.router.navigate(['/navigation/konnektor-view']);
  }

  private createForm(): void {
      this.konnektorForm = this.fb.group({
        id: '',
        hostName: '',
        serialNumber: '',
        firmwareVersion: '',
        hardwareVersion: '',
        created: '',
        active: ''
      });
  }

  private loadFormData(): void {
    if (this.konnektor) {
      this.konnektorForm.patchValue({
        id: this.konnektor.id,
        hostName: this.konnektor.hostName,
        serialNumber: this.konnektor.serialNumber,
        firmwareVersion: this.konnektor.firmwareVersion,
        hardwareVersion: this.konnektor.hardwareVersion,
        created: this.konnektor.created,
        active: this.konnektor.active
      });
    }
  }

}
