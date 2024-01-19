import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {FooterComponent} from "./footer.component";
import {NavigationComponent} from "./navigation.component";

@Component({
  standalone: true,
  selector: 'app-template',
  template: `
    <app-navigation></app-navigation>
    <div class="container-fluid mt-3">
      <div #errorStrip style="background-color: aquamarine; visibility: hidden">
      hiba sáv

      <br>
      </div>
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
export class TemplateComponent implements OnInit, AfterViewInit {

  @ViewChild("errorStrip") errorStrip: ElementRef;

  constructor(private renderer : Renderer2) {
  }

  ngOnInit(): void {

  }

  ngView

  ngAfterViewInit(): void {
    console.log("TemplateComponent");

  }

}
