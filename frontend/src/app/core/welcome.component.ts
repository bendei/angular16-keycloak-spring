import {Component} from "@angular/core";


@Component({
  standalone: true,
  selector: 'app-welcome',
  template: 'Welcome'
})
export class WelcomeComponent {

  constructor() {
    console.log("---WelcomeComponent");
  }


}
