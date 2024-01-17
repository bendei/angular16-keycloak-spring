import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterLink, Routes} from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  imports: [CommonModule, RouterLink
    ]
})
export class NavigationComponent {

  routeParamOne = "44342";

  constructor() {
    console.log("-------NavigationComponent");
  }

}
