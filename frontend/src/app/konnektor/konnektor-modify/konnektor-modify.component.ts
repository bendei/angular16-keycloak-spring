import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DefaultService, KonnektorDTO} from "../../../../target/generated-sources/openapi";
import {ToastService} from "../../toast/toast.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AuditLogModal} from "../auditlog-modal/auditlog-modal.component";

@Component({
  selector: 'app-konnektor-modify',
  templateUrl: './konnektor-modify.component.html'
})
export class KonnektorModifyComponent implements OnInit {

  private konnektorId;
  public konnektor: KonnektorDTO;
  public konnektorForm!: FormGroup;

  constructor(private readonly fb: FormBuilder, private route: ActivatedRoute, private readonly defaultService: DefaultService, private readonly toast: ToastService,
              private readonly router: Router, private modalService: NgbModal) {
  }

  async ngOnInit() { this.createForm();
    this.konnektorId = this.route.snapshot.paramMap.get('id');

    if(this.konnektorId) {
      const konn = await this.defaultService.getKonnektor(this.konnektorId).toPromise();
        this.konnektor = konn;
        this.loadFormData();
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
  }

}
