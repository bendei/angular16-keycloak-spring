import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DefaultService, KonnektorDTO} from "../../../../target/generated-sources/openapi";
import {ToastService} from "../../toast/toast.service";
import {NgbDateStruct, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AuditLogModal} from "../auditlog-modal/auditlog-modal.component";
import {NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

function toInteger(value: any): number {
  return parseInt(`${value}`, 10);
}

function isNumber(value: any): value is number {
  return !isNaN(toInteger(value));
}

@Component({
  selector: 'app-konnektor-modify',
  templateUrl: './konnektor-modify.component.html'
})
export class KonnektorModifyComponent implements OnInit {

  private konnektorId;
  public konnektor: KonnektorDTO;
  public konnektorForm!: FormGroup;
  public model: NgbDateStruct;

  constructor(private readonly fb: FormBuilder, private route: ActivatedRoute, private readonly defaultService: DefaultService, private readonly toast: ToastService,
              private readonly router: Router, private modalService: NgbModal,  private readonly calender: NgbCalendar) {
  }

  async ngOnInit() { this.createForm();
    this.konnektorId = this.route.snapshot.paramMap.get('id');

    if(this.konnektorId) {
      const konn = await this.defaultService.getKonnektor(this.konnektorId).toPromise();
        this.konnektor = konn;
        this.loadFormData();
    }

    this.model = this.calender.getToday();
  }

  public onSubmit(): void {
    const {id, hostName, serialNumber, firmwareVersion, hardwareVersion, active, created} = this.konnektorForm.getRawValue();

    const createdISO = this.ngbDateStructToISO(created);
    this.defaultService.updateKonnektor(id, {
      id, hostName, serialNumber, firmwareVersion, hardwareVersion, active, created: createdISO}).subscribe(
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

  open() {
    const modalRef = this.modalService.open(AuditLogModal,  { size: 'xl' });
    modalRef.componentInstance.auditlogs = this.konnektor.auditlogs;
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

    const date: NgbDateStruct = this.isoToNgbDateStruct(this.konnektor.created);
    //this.konnektorForm.get('created')?.setValue(this.calender.getToday());
    this.konnektorForm.get('created')?.setValue(date);
  }


  private isoToNgbDateStruct(isoString: string): NgbDateStruct {
    if(isoString) {
      const dateParts = isoString.trim().split('-');
      if (dateParts.length == 3) {
        return { year: parseInt(dateParts[0], 10), month: parseInt(dateParts[1], 10), day: parseInt(dateParts[2].substring(0,3), 10) };
      }
    }
  }

  // format: 2022-08-14T08:00:50.44
  private ngbDateStructToISO(model: NgbDateStruct): string {
    const padTime = () => "T06:00:50.43";

    const padMonth = (m: number) => {
      if (isNumber(m)) {
        if (m.toString().trim().length == 1) {
        return "0" + m;
      } else {
        return m;
      }
      }
    };

    if (model && isNumber(model.year) && isNumber(model.month) && isNumber(model.day)) {
      return model.year + '-' + padMonth(model.month) + '-' + padMonth(model.day) + padTime();
    }
  }

}
