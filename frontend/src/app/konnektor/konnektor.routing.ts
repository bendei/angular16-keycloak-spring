import {Routes} from '@angular/router';
import {TemplateComponent} from "../core/template.component";
import {KonnektorRemoveComponent} from "./konnektor-remove/konnektor-remove.component";
import {KonnektorModifyComponent} from "./konnektor-modify/konnektor-modify.component";

export const konnektorRoutes: Routes = [
  {
    path: 'konnektor',
    component: TemplateComponent,
    children: [
      {
        path: 'remove',
        component: KonnektorRemoveComponent
      },
      {
        path: 'modify',
        component: KonnektorModifyComponent
      }
    ]
  }
];
