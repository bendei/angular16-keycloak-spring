import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit
} from "@angular/core";


@Component({
  selector: 'cd2',
  templateUrl: './cd2.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class Cd2Component implements OnChanges, DoCheck, OnDestroy, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked{

  counter: number = 0;

  constructor() {
    console.log("Cd2Component:Contructed");
  }

  incrementProperty(): void {
    ++this.counter;
  }

  donotincrementProperty(): void {
    // do nothing
  }

  ngOnChanges() {
    console.log("Cd2Component:ngOnChanges");
  }

  ngOnInit() {
    console.log("Cd2Component:ngOnInit");
  }

  ngDoCheck() {
    console.log("CHANGE DETECTION TGRIGGERED -- Cd2Component:DoCheck");
  }

  ngAfterContentInit() {
    console.log("Cd2Component:ngAfterContentInit");
  }

  ngAfterContentChecked() {
    console.log("Cd2Component:AfterContentChecked");
  }

  ngAfterViewInit() {
    console.log("Cd2Component:AfterViewInit");
  }

  ngAfterViewChecked() {
    console.log("Cd2Component:AfterViewChecked");
  }

  ngOnDestroy() {
    console.log("Cd2Component:ngOnDestroy");
  }


}
