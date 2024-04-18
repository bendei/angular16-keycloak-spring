import {
  Component, computed, DoCheck,
  ElementRef, inject,
  NgZone, OnChanges, OnDestroy, OnInit,
  Renderer2, signal, SimpleChanges,
  ViewChild
} from "@angular/core";
import {CdchildComponent} from "./cdchild.component";
import {ObservableService} from "../core/observable.service";
import {RouteCommonService} from "../core/route.common.service";
import {BehaviorSubject, Observable, of, Subscription} from "rxjs";
import {Cdservice} from "./cdservice";
import {result} from "lodash";
import {SimpleService} from "./simple.service";
import {Event} from "@angular/router";

const userArr = [{name: "bende", age: 33},{name: "pisti", age: 23},{name: "feri", age: 55},{name: "kati", age: 43}];
const items = [
  { name: 'Apple', price: 1 },
  { name: 'Orange', price: 2 },
  { name: 'Mango', price: 3 },
];

const users = [{id: 1, name: 'egy'},{id: 2, name: 'ketto'},{id: 3, name: 'harom'}];
const statuses = [{id: 1, isActive: true}, {id: 2, isActive: true}, {id: 3, isActive: false}]

@Component({
  standalone: true,
  selector: 'cd',
  templateUrl: './cd.component.html',
  imports: [CdchildComponent],
})
export class CdComponent implements  DoCheck {

  private routeCommonService = inject(RouteCommonService);
  private readonly cdService = inject(Cdservice);



  text = 'text';
  szam = 22;
  routeCommonServiceProperty = 0;


  @ViewChild("movingArea", {static: false})
  public movingArea!: ElementRef;


 constructor() {
 }

  clickToIcrementInputSzam(): void {
    this.szam++;
  }

  incrementRouteCommonServiceProperty() {
    this.routeCommonService.incrementRouteCommonServiceProperty();
    this.routeCommonServiceProperty = this.routeCommonService.commonServiceProperty;
  }

  public kiir() {
    return "kiir";
  }

  ngOnChanges(changes: SimpleChanges): void {
   console.log("ngOnChanges");
  }

  ngDoCheck(): void {
    console.log("ngDoCheck");
  }

}

export interface UserInterface {
  name: string,
  age: number,
}

export const User: UserInterface = {
  name: "wwww",
  age: 33,
}










