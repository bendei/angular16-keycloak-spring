import {
  Component, computed, DoCheck,
  ElementRef, inject,
  NgZone, OnChanges, OnDestroy, OnInit,
  Renderer2, signal, SimpleChanges, viewChild,
} from "@angular/core";
import {CdchildComponent} from "./cdchild.component";
import {RouteCommonService} from "../core/route.common.service";
import {Cdservice} from "./cdservice";
import {FormsModule} from "@angular/forms";

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
  imports: [CdchildComponent, FormsModule],
})
export class CdComponent implements  DoCheck, OnInit {

  private routeCommonService = inject(RouteCommonService);
  private readonly cdService = inject(Cdservice);
  objektum = signal({id: 1, name: "ez"}, {equal: (a,b ) => {
    return a.id === b.id && a.name === b.name
    }});
  objektumComputed = computed(() => {
    console.log("objektumComputed calculated");
    return this.objektum().name;
  });


  spanRef = viewChild<ElementRef<HTMLSpanElement>>("spanRef");

  _textem: string = "";
  text = 'text';
  szam = 22;
  routeCommonServiceProperty = 0;
  atpasszolniChildnek = "atpasszolniChildnek";


 constructor() {
 }

 megjott(event: string): void {
   console.log(event);
 }

 updateobjektumComputed(): void {
   this.objektum.set({id: 2, name: "ezmegeg"})
 }


  set textem(tex: string) {
   console.log("textem: " + this._textem);
   this._textem = tex;
  }
  get textem(): string {
    console.log("textem: " + this._textem);
   return this._textem;
  }

  reactToOutputObs(event: string) {
   console.log("reactToOutputObs: " + event);
  }

  reactToMyOutputFormObs(event: number) {
    console.log("reactToMyOutputFormObs: " + event);
  }

  reactToChildEvent(event: string): void {
   console.log(event);
  }

 ngOnInit() {
   const elem = this.spanRef();
   if(elem) {
     elem.nativeElement.innerText = "kakaukk ngOnInit";
   }

   const eny = StatusEnum.NOT_OK;
  console.log(this.szvics(eny));

 }

 private szvics(enyum: StatusEnum): string {
   switch(enyum) {
     case StatusEnum.OK:
       return "ok";
     case StatusEnum.NOT_OK:
       return "not";
     default: return "--";
   }
 }

 changeViewChildText(): void {
   const elem = this.spanRef();
   if(elem) {
     elem.nativeElement.innerText = "kakaukk changeViewChildText";
   }
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

const enum StatusEnum {
  OK,
  NOT_OK
}









