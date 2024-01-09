import {Component} from '@angular/core';
import {DatePipe} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-footer',
  template: `
    <footer class="bg-faded ">
      <div class="container-fluid mt-3">
        <span class="float-right">version 1.0 </span>
        <span class="float-end">Date: {{datum | date}}</span>
      </div>

    </footer>
  `,
  imports: [DatePipe]
})
export class FooterComponent {

  datum = new Date();

}
