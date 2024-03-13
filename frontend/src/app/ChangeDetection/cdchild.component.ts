import {
  AfterViewChecked,
  Component,
  DoCheck,
  effect,
  input,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from "@angular/core";
import {User} from "./cd.component";


@Component({
  standalone: true,
  selector: "cdchild",
  templateUrl: "./cdchild.component.html"
})
export class CdchildComponent {

  szam = input<number>();

  constructor() {
    effect(() => {
      this.szamlalo(this.szam());
    })


  }

  szamlalo = (szam: number | undefined) : void => {
    console.log("input effect(): " + szam);
  };



}





