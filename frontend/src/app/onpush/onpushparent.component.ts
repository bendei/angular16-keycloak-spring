import {ChangeDetectionStrategy, Component, DoCheck, OnChanges, SimpleChanges} from "@angular/core";
import {OnpushService} from "./onpush.service";

@Component({
  selector: 'onpush-parent',
  templateUrl: './onpushparent.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnpushparentComponent implements DoCheck, OnChanges {

  _szam = 0;
  get szam() {
    return this.service.szam; // ha nem a modellel updateljuk a propertyt akkor a CD nem talál változást, mert nem is lesz, mikor a child updateli a service propertijet
    console.log('----PARENT--GET szam called ');
    //return this._szam;
  }
  set szam(s: number) {
    console.log('----PARENT--SET szam called ');
    this._szam = s;
  }

  constructor(private service: OnpushService) {
  }

  ngDoCheck(): void {
    console.log('---PARENT--- ngDoCheck');

  }

  public incrementSzamOnParent(): void {
    ++this.service.szam;
   // this.szam = this.service.szam;  // ezt be kell újra állitani, különben hiába fut le a CD, nem lesz uj erték adva a változónak
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('---PARENT--ngOnChanges- ');
    //this.szam = this.service.szam;
  }


}
