import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {provideRouter, RouterLink, RouterModule, Routes} from "@angular/router";
import {KonnektorModifyComponent} from "../konnektor/konnektor-modify/konnektor-modify.component";


const routes: Routes = [
  { path: '', component: KonnektorModifyComponent },
  { path: 'about', component: KonnektorModifyComponent },
];

@Component({
  standalone: true,
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  imports: [CommonModule
    ]
})
export class NavigationComponent {

  constructor() {
    console.log("-------NavigationComponent");
  }

}
