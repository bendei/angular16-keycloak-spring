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

export interface User {name: string, age?: number}

export interface StateOne  {
  name: string
};
interface StateTwo  {
  name: string;
}
type State = StateOne | StateTwo;

let myt: [number, string, string];


type Egy = {
  name: string
};

type Ketto = {age: number} & Egy;

@Component({
  standalone: true,
  selector: 'cd',
  templateUrl: './cd.component.html',
  imports: [CdchildComponent]
})
export class CdComponent {
  private renderer2 = inject(Renderer2, {host: true});
  private routeCommonService = inject(RouteCommonService);

  counterInputPropertySetter = 0;
  text = 'text';
  szam = 22;
  routeCommonServiceProperty = 0;


  @ViewChild("movingArea", {static: false})
  public movingArea!: ElementRef;

  user: User = {
    name: 'bende',
  };

  userSet: User = {
    name: 'pisti',
    age: 50
  }

  constructor() {
    // a setTimout is triggerelni a DC-t ezért lefut az egesz DC :)
    setTimeout(() => {
      console.log("timeout");
      //this.conversions();
      //this.myoperators();
    }, 2000);




    const backendErrors = {
      email: {
        errors: [
          {message: "Can't be blank"}
        ]
      },
      password: {
        errors: [
          {message: "Must contain symbols in different case"},
          {message: "Must be at least 8 symbols length"},
        ]
      },
      passwordConfirmation: {
        errors: [
          {message: "Must match with password"}
        ]
      }
    }

    this.tovalidationMsg(backendErrors);
    // Result
// [
// "Email: Can't be blank",
// "Password: Must contain symbols in different case, Must be at least

// "PasswordConfirmation: Must match with password"
// ]

  }

  tovalidationMsg = (backendErrors: {email: {errors: {message: string}[]}, password: {errors: {message: string}[]}, passwordConfirmation: { errors: {message: string}[]}  }): void => {
    const adatArr = Object.entries(backendErrors);
    adatArr.forEach( ( entry) => {
      const propertyName = entry[0];
      const propertyValue = entry[1];
      console.log(propertyName);
      propertyValue.errors.forEach( (msgObj) => {
        console.log(msgObj.message);
      })
    })

// array of the properties of an object, key is the property name, value is the properties value
    let ember = {
      name: "pisti",
      age: 34,
      arr: [1,2,3],
      obj: {
        elso: "a",
        masodik: "m"
      }
    };

    console.log("ember: " + Object.entries(ember));
    console.log("ember: " + Object.entries(ember)[0][1]);

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

  kakukk = () => {
    console.log(this.szam);
  };
}

const merge = (ar1, ar2) => {
  return ar1.concat(ar2);
};

interface UserInterface {
  name: string,
  age: number,
  kiir(): void
}

const User: UserInterface = {
  name: "wwww",
  age: 33,
  kiir(): void {}
}






