import {ChangeDetectionStrategy, Component, DoCheck, Input, OnChanges, SimpleChanges} from "@angular/core";
import {OnpushService} from "./onpush.service";
import {User} from "../ChangeDetection/cd.component";


@Component({
  selector: 'childA',
  templateUrl: './onpushchild.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class OnpushchildComponent implements DoCheck, OnChanges {

  exprOne = 0;
  szam = 0;

  @Input()
  user: User;

  constructor(private service: OnpushService) {
  }

  ngDoCheck(): void {
    console.log('---Child A--- ngDoCheck');
  }

  public updateSzam(): void {
    this.szam = this.service.szam;
  }

  public expreOne(): number {
    console.log('----Child A--CD reevaluated tzhe primitive data binding string iunterpolation exprOne ');
    return ++this.exprOne;
  }

  public incrementServiceSzam(): void {
    ++this.service.szam;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('----Child --ngOnChanges ');
  }

}
