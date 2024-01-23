import {ChangeDetectionStrategy, Component, DoCheck, OnChanges} from "@angular/core";

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

  ngOnChanges() {
    console.log("       Cd2child111Component:ngOnChanges");
  }

  ngOnInit() {
    console.log("      Cd2child11Component:ngOnInit");
  }

  ngDoCheck() {
    console.log("       CHANGE DETECTION TGRIGGERED - Cd2child11Component:DoCheck");
  }


}
