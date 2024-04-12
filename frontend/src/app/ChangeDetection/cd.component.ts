import {
  Component,
  ElementRef, inject,
  NgZone,
  Renderer2,
  ViewChild
} from "@angular/core";
import {CdchildComponent} from "./cdchild.component";
import {ObservableService} from "../core/observable.service";
import {RouteCommonService} from "../core/route.common.service";
import {Observable, of} from "rxjs";
import {Cdservice} from "./cdservice";


@Component({
  standalone: true,
  selector: 'cd',
  templateUrl: './cd.component.html',
  imports: [CdchildComponent]
})
export class CdComponent {
  private renderer2 = inject(Renderer2, {host: true});
  private routeCommonService = inject(RouteCommonService);
  private readonly cdService = inject(Cdservice);

  counterInputPropertySetter = 0;
  text = 'text';
  szam = 22;
  routeCommonServiceProperty = 0;


  @ViewChild("movingArea", {static: false})
  public movingArea!: ElementRef;




 constructor() {
    // a setTimout is triggerelni a DC-t ezért lefut az egesz DC :)
    setTimeout(() => {
      console.log("timeout");
      //this.conversions();
      //this.myoperators();
    }, 2000);



    const items = [
      { name: 'Apple', price: 1 },
      { name: 'Orange', price: 2 },
      { name: 'Mango', price: 3 },
    ];


   callBackendWithPromise();

    this.callBackendObservable().subscribe(
      result => {
        console.log(result);
      }
    );

  this.cdService.getAllKonnektors().subscribe(
    {
      next: (result) => { console.table(result)},
      error: (error) => console.log("Error componenben: " + error.status),
      complete: () => console.log("Observable completetd")
    }
  );


};




  clickToIcrementInputSzam(): void {
    this.szam++;
  }

  incrementRouteCommonServiceProperty() {
    this.routeCommonService.incrementRouteCommonServiceProperty();
    this.routeCommonServiceProperty = this.routeCommonService.commonServiceProperty;
  }


  public kiir() {
    //console.log('PARENT------ kiir() ');
    return "kiir";
  }

  callBackendObservable(): Observable<UserInterface[]> {
    return of(userArr).pipe(

    );
  }

}


interface UserInterface {
  name: string,
  age: number,
}

export const User: UserInterface = {
  name: "wwww",
  age: 33,
}

const userArr = [{name: "bende", age: 33},{name: "pisti", age: 23},{name: "feri", age: 55},{name: "kati", age: 43}];

const callBackendWithPromise = async () => {
  try {
    let result = await backendWithPromise();
    console.log(result);
  } catch (error) {
    console.log("promise error: " + error)
  }
};



const backendWithPromise = (): Promise<UserInterface> => {
  return new Promise((resolve, reject) => {
    resolve(User);
  })




}



