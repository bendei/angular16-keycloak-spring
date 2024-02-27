import {ChangeDetectionStrategy, Component, DoCheck, signal} from "@angular/core";

@Component({
  standalone: true,
  selector: 'signal-child',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <h3>Signal Child</h3>
      <p>Signal child component</p>
      {{ertek()}} <button (click)="incrementMe()">Increment</button>

    </div>
  `
})
export class SignalChildComponent implements DoCheck {

  ertek = signal(0);


  incrementMe() {
    this.ertek.update( () => this.ertek() + 1);
  }

  ngDoCheck(): void {
    console.log("SignalChildComponent: ngDoCheck() called.");
  }

}
