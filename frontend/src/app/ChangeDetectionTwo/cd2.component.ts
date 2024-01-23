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
import { Observable, of, Subject} from "rxjs";
import {RouteCommonService} from "../core/route.common.service";
import {ObservableService} from "../core/observable.service";

@Component({
  standalone: true,
  selector: 'cd2',
  templateUrl: './cd2.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [Cd2child1Component, Cd2child11Component],
})
export class Cd2Component implements OnChanges, DoCheck, OnDestroy, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked{

  _simpleParentProperty = 111;
  routeCommonServiceProperty = 0;
  observableServiceProperty = 0;

  get simpleParentProperty(): number {
    console.log("simpleParentProperty Cd2Component: " + this._simpleParentProperty);
    return this._simpleParentProperty;
  }

  @Input() routeParamOne = '';
  parentcounter: Counter = {count: 0};

  constructor(private observableService: ObservableService, private routeCommonService: RouteCommonService) {
    this.routeCommonServiceProperty = this.routeCommonService.commonServiceProperty;

    let myObservable: Observable<string> = of("pisti");
    myObservable.subscribe( (value) => {
      console.log("myobservable: " + value);
    });

    // just to show how ErrorHandler works
    //throw new Error("hiba");
  }

  incrementRouteCommonServiceProperty() {
    this.routeCommonService.incrementRouteCommonServiceProperty();
    this.routeCommonServiceProperty = this.routeCommonService.commonServiceProperty;
    console.log(this.routeCommonServiceProperty);
  }

  incrementProperty(): void {
    this.parentcounter = {count: ++this.parentcounter.count};
  }

  incrementObservableServiceProperty() {
    this.observableService.incrementCommonServiceProperty();
    this.observableServiceProperty = this.observableService.getCommonData();
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

export interface Counter {
  count: number;
}
