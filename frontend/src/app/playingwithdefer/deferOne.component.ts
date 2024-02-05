import {Component} from "@angular/core";
import {DeferTwoComponent} from "./deferTwo.component";


@Component({
  standalone: true,
  selector: 'deferOne',
  templateUrl: './deferOne.component.html',
  imports: [DeferTwoComponent]
})
export class DeferOneComponent {

isDeferOneVisible =  false;

constructor() {
}

}
