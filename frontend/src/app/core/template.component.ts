import {Component} from '@angular/core';
import {RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {FooterComponent} from "./footer.component";
import {NavigationComponent} from "./navigation.component";

@Component({
  standalone: true,
  selector: 'app-template',
  template: `
    <app-navigation></app-navigation>
    <div class="container-fluid mt-3">template component
        <router-outlet></router-outlet>
    </div>
    <app-footer></app-footer>
  `,
  imports: [
    RouterOutlet,
    RouterLinkWithHref,
    FooterComponent,
    NavigationComponent
  ]
})
export class TemplateComponent {

}
