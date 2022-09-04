import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DefaultService, KonnektorDTO} from "../../../../target/generated-sources/openapi";
import {ToastService} from "../../toast/toast.service";
import {NgbDateStruct, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AuditlogModalComponent} from "../auditlog-modal/auditlog-modal.component";
import {NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {TimeStruct} from "../../core/helper";
import {isNumber} from "lodash";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-konnektor-modify',
  templateUrl: './konnektor-modify.component.html'
})
export class KonnektorModifyComponent implements OnInit {

  private konnektorId;
  public konnektor: KonnektorDTO;
  public konnektorForm!: FormGroup;
  public model: NgbDateStruct;
  // tuples
  private ember: [number, string, boolean];
  private emberArray: [number, string, boolean][];
  // 2-way binding
  public fullName = 'pista';


  constructor(private readonly fb: FormBuilder, private route: ActivatedRoute, private readonly defaultService: DefaultService, private readonly toast: ToastService,
              private readonly router: Router, private modalService: NgbModal,  private readonly calender: NgbCalendar) {

    // just for learning
    this.ember = [50, 'bende', true];
    this.ember.push(55, 'qqq', false);
    console.log(this.ember[0]);
    this.emberArray = [[11, 'aaa', true]];
    this.emberArray.push([22, 'bbb', true]);
    console.log(this.emberArray);
    console.log(this.emberArray[0][0]);

  }

  async ngOnInit() { this.createForm();
    this.konnektorId = this.route.snapshot.paramMap.get('id');

    if(this.konnektorId) {
        await this.defaultService.getKonnektor(this.konnektorId).toPromise().then( result => {
          this.konnektor = result;
          this.loadFormData();
        }).catch( error => {
            this.toast.error((error as HttpErrorResponse).message);
          }
        )
    }

    this.model = this.calender.getToday();
  }

  public async onSubmit() {
    const {id, hostName, serialNumber, firmwareVersion, hardwareVersion, active, created, createdTime} = this.konnektorForm.getRawValue();
    const createdISO = this.ngbDateStructToISO(created);
    const createdTimeISO = KonnektorModifyComponent.timeStructToISO(createdTime);

    console.log("createdTimeISO:", createdTimeISO);

    this.defaultService.updateKonnektor(id, {
      id, hostName, serialNumber, firmwareVersion, hardwareVersion, active, created: createdISO + "" + createdTimeISO}).toPromise().then(
      () => {
        this.toast.success("konnektor updated");
        this.router.navigate(['/navigation/konnektor-view']);
      })
      .catch(() => {
        this.toast.error("konnektor could not be updated.");
      }
    );
  }

  public onBack(): void {
    this.router.navigate(['/navigation/konnektor-view']);
  }

  async open() {
    await this.defaultService.getAllAuditLog(this.konnektor.id).toPromise().then( result => {
        result => console.log("hahahaha:   " + result);
        const modalRef = this.modalService.open(AuditlogModalComponent,  { size: 'xl' });
        modalRef.componentInstance.auditlogs = result;
      }
    ).catch( error => {
      this.toast.error((error as HttpErrorResponse).message);
    });

  }

  private createForm(): void {
      this.konnektorForm = this.fb.group({
        id: '',
        hostName: '',
        serialNumber: '',
        firmwareVersion: '',
        hardwareVersion: '',
        created: '',
        createdTime: '',
        active: '',
        validUntil: ''
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
        createdTime: KonnektorModifyComponent.isoToTime(this.konnektor.created),
        active: this.konnektor.active,
        validUntil: this.konnektor.validUntil
      });
    }

    const date: NgbDateStruct = KonnektorModifyComponent.isoToNgbDateStruct(this.konnektor.created);
    //this.konnektorForm.get('created')?.setValue(this.calender.getToday());
    this.konnektorForm.get('created')?.setValue(date);
  }

  // format: 2022-08-14T08:00:50.44
  private static isoToTime(isoString: string): TimeStruct {
    if (isoString) {
      const timeString = isoString.trim().substring(isoString.indexOf('T') + 1);
      const timeParts = timeString.trim().split(':');
      return {
        hour: parseInt(timeParts[0]),
        minute: parseInt(timeParts[1].substring(0,2))
      };
    }
    return {
      hour: 0,
      minute: 0
    };
  }

  // format: 2022-08-14T08:00:50.44
  private static timeStructToISO(time: TimeStruct): string {
    if (isNumber(time.hour) && isNumber(time.minute)) {
      return "T" + time.hour.toString().padStart(2, "0") + ":" + time.minute.toString().padStart(2, "0") + ":00.50"
    }
    return "T00:00:00.44";
  }

  private static isoToNgbDateStruct(isoString: string): NgbDateStruct {
    if(isoString) {
      const dateParts = isoString.trim().split('-');
      if (dateParts.length == 3) {
        return { year: parseInt(dateParts[0], 10), month: parseInt(dateParts[1], 10), day: parseInt(dateParts[2].substring(0,3), 10) };
      }
    }
  }

  // format: 2022-08-14T08:00:50.44
  private ngbDateStructToISO(model: NgbDateStruct): string {
    //const padTime = () => "T06:00:50.43";

    const padMonth = (m: number) => {
      if (isNumber(m)) {
        if (m.toString().trim().length == 1) {
        return m.toString().trim().padStart(2,"0");
      } else {
        return m;
      }
      }
    };

    if (model && isNumber(model.year) && isNumber(model.month) && isNumber(model.day)) {
      return model.year + '-' + padMonth(model.month) + '-' + padMonth(model.day); // + padTime();
    }
  }

  public twoway(event: any) {
    this.fullName = event.target.value;
  }

}
