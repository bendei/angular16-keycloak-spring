import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DoCheck, Input,
  OnChanges,
  OnDestroy,
  OnInit
} from "@angular/core";
import {Cd2child11Component} from "./cd2child11.component";
import {Cd2child1Component} from "./cd2child1.component";
import {Observable, of} from "rxjs";
import {CommonService} from "../core/common.service";

@Component({
  standalone: true,
  selector: 'cd2',
  templateUrl: './cd2.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [Cd2child1Component, Cd2child11Component],
})
export class Cd2Component implements OnChanges, DoCheck, OnDestroy, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked{

  @Input() routeParamOne = '';
  counter: number = 0;
  commonServiceProperty = 0;

  constructor(private commonService: CommonService) {
    this.commonServiceProperty = this.commonService.commonServiceProperty;

    let myObservable: Observable<string> = of("pisti");
    myObservable.subscribe( (value) => {
      console.log("myobservable: " + value);
    });

    // just to show how ErrorHandler works
    //throw new Error("hiba");
  }

  incrementCommonServiceProperty() {
    this.commonService.incrementCommonServiceProperty();
    this.commonServiceProperty = this.commonService.commonServiceProperty;
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
    console.log(`Cd2Component:ngOnInit, reading url input parameters: ${this.routeParamOne}`);
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
