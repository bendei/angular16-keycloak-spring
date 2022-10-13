import {Component, ElementRef, HostBinding } from '@angular/core';
import {fromEvent} from "rxjs";

@Component({
  selector: 'app-auditlog',
  templateUrl: `./auditlog.component.html`
})
export class AuditlogComponent {

  @HostBinding() el: ElementRef;

  constructot() {
    const fe = fromEvent(this.el.nativeElement, 'click');

    fe.subscribe(x => console.log('------ ' + x));
  }

}

