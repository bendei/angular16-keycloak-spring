import {ChangeDetectionStrategy, Component, DoCheck, Input, OnChanges, SimpleChanges} from "@angular/core";
import {OnpushService} from "./onpush.service";


@Component({
  selector: 'childA',
  templateUrl: './onpushchild.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnpushchildComponent implements DoCheck, OnChanges {

  @Input()
  public ez: number;

  exprOne = 0;

  _szam = 0;
  get szam() {
    console.log('----Child A--GET szam called ');
    return this._szam;
  }
  set szam(s: number) {
    console.log('----Child A--GET szam called ');
    this._szam = s;
  }

  constructor(private service: OnpushService) {
  }

  ngDoCheck(): void {
    console.log('---Child A--- ngDoCheck');
    //this.szam = this.service.szam;
  }

  public updateSzam(): void {
    this.szam = this.service.szam;
  }

  public expreOne(): number {
    return ++this.exprOne;
  }

  public incrementServiceSzam(): void {
    ++this.service.szam;
    this.szam = this.service.szam;  // ezt be kell újra állitani, különben hiába fut le a CD, nem lesz uj erték adva a változónak
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('----Child --ngOnChanges ');
    //this.szam = this.service.szam;
  }

}
