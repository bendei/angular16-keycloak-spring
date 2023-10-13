import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
} from '@angular/core';
import {AuditlogDirective} from "./auditlog.directive";

@Component({
  selector: 'app-auditlog',
  templateUrl: `./auditlog.component.html`,
  styleUrls: ['./auditlog.component.css'],
  imports: [AuditlogDirective],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuditlogComponent  {

  _nevem = 'pista';
  objectForDirective: ObjectForDirective = {age: 51};

  @HostBinding('style') style = "background-color: grey";
  //@HostListener('click') onClicked() { alert("clicked"); };

  get nevem(): string {
    console.log("CD updated the nevem string interpolation value");
    return this._nevem;
  }


  constructor(private cd: ChangeDetectorRef) {
  }



  clicked() {

  }

  mouseMove() {

  }

  mouseEnter() {
    this.cd.detach();
  }

  mouseLeave() {
    this.cd.reattach()
  }

  changeObjectTypeInput() {
    const clonedObject = {...this.objectForDirective};
    clonedObject.age = ++clonedObject.age;
    this.objectForDirective = clonedObject;
  }

}

export interface ObjectForDirective {
  age: number;
}

