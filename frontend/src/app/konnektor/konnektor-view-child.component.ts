import {Component} from "@angular/core";

@Component({
  standalone: true,
  selector: 'konnektor-view-child',
  templateUrl: './konnektor-view-child.component.html'
})
export class KonnektorViewChildComponent {

  counter: number = 0;
  counterViewChild: number = 0;

  increment() {
    ++this.counter;
  }

  incrementUseViewChild() {
    ++this.counterViewChild;
  }

}
