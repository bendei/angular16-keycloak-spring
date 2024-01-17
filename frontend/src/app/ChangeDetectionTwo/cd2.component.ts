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
import {Cd2child11Component} from "./cd2child11.component";
import {Cd2child1Component} from "./cd2child1.component";
import {Observable, of} from "rxjs";
import {GlobalErrorHandler} from "../core/global-error-handler.service";

@Component({
  standalone: true,
  selector: 'cd2',
  templateUrl: './cd2.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [Cd2child1Component, Cd2child11Component]
})
export class Cd2Component implements OnChanges, DoCheck, OnDestroy, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked{

  counter: number = 0;

  constructor() {
    console.log("--------- Cd2Component:Contructed");

    let myObservable: Observable<string> = of("pisti");
    myObservable.subscribe( (value) => {
      console.log("myobservable: " + value);
    });

    // just to show how ErrorHandler works
    throw new Error("hiba");
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
