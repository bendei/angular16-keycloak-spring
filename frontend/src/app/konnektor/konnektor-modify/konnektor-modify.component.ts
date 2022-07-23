import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {DefaultService, KonnektorDTO} from "../../../../target/generated-sources/openapi";

@Component({
  selector: 'app-konnektor-modify',
  templateUrl: './konnektor-modify.component.html'
})
export class KonnektorModifyComponent implements OnInit {

  private konnektorId;
  private konnektor: KonnektorDTO;
  public konnektorForm!: FormGroup;

  constructor(private readonly fb: FormBuilder, private route: ActivatedRoute, private readonly defaultService: DefaultService) {
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
        hostname: this.konnektor.hostname,
        serialNumber: this.konnektor.serialNumber,
        firmwareVersion: this.konnektor.firmwareVersion,
        hardwareVersion: this.konnektor.hardwareVersion,
        created: this.konnektor.created,
        active: this.konnektor.active
      });
    }
  }

}
