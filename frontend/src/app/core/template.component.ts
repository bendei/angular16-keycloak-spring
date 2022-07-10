import {Component} from '@angular/core';


@Component({
  selector: 'app-template',
  template: `
    <app-navigation></app-navigation>
    <div class="container-fluid mt-3">
        <router-outlet></router-outlet>
    </div>
    <app-footer></app-footer>
  `
})
export class TemplateComponent {

}
