import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import {OnpushService} from "./onpush.service";
import {User} from "../ChangeDetection/cd.component";


@Component({
  selector: 'childA',
  templateUrl: './childA.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildAComponent implements DoCheck, OnChanges, AfterViewInit, AfterViewChecked {

  exprOne = 0;
  _szam = 0;

  get szam(): number {
    console.log("----Child A  -- get szam called");
    return this._szam;
  }

  set szam(sz: number) {
    console.log("----Child A  --- set szam called");
    this._szam = sz
  }

  @Input()
  user: User;

  constructor(private service: OnpushService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('----Child A --ngOnChanges ');
  }

  ngDoCheck(): void {
    console.log('---Child A--- ngDoCheck');
  }

  ngAfterViewChecked(): void {
    console.log('---Child A--- ngAfterViewChecked');
  }

  ngAfterViewInit(): void {
    console.log('---Child A--- ngAfterViewInit');
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





}
