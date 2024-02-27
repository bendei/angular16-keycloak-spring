import {ChangeDetectionStrategy, Component, DoCheck, OnChanges, signal} from "@angular/core";

@Component({
  standalone: true,
  selector: 'cd2child11',
  templateUrl: "./cd2child11.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Cd2child11Component implements OnChanges, DoCheck {

  _szamlalo: number = 0;

  get szamlalo(): number{
    console.log("szamlalo property - Cd2child11Component:" + this._szamlalo);
    return this._szamlalo;
  }

  counter = signal(0);

  constructor() {
    const inter = setInterval(() => {
      this.counter.update((val) => ++val);

      if (this.counter() == 4) {
        clearInterval(inter);
      }
    }, 2000);
  }



  ngOnChanges() {
    console.log("       Cd2child11 Component:ngOnChanges");
  }

  ngDoCheck() {
    console.log("------Cd2child11 Component:DoCheck");
  }


}
