import {Routes} from '@angular/router';
import {TemplateComponent} from './core/template.component';
import {compact} from "lodash";
import {WelcomeComponent} from "./core/welcome.component";
import {KonnektorViewComponent} from "./konnektor/konnektor-view.component";
import {AuditlogComponent} from "./auditlog/auditlog.component";
import {CdComponent} from "./ChangeDetection/cd.component";
import {Cd2Component} from "./ChangeDetectionTwo/cd2.component";
import {OnpushparentComponent} from "./onpush/onpushparent.component";
import {NavigationErrorComponent} from "./core/navigationerror.component";

export const APP_ROUTES: Routes = [
  /* default routing */
  {
    path: 'navigation',
    component: TemplateComponent,
    //canActivate: [navigationGuard],

    children: [
      {
        path: 'konnektor-view',
        component: KonnektorViewComponent,
      },
      {
        path: "auditlog",
        component: AuditlogComponent
      },
      {
        path: "cd",
        component: CdComponent
      },
      {
        path: "cd2",
        component: Cd2Component
      },
      {
        path: "onpush",
        component: OnpushparentComponent
      }
    ]
  },
  {
    path: 'navigationerror',
    component: NavigationErrorComponent

  },
  {path: '', component: WelcomeComponent}, // accessing with outer route
  {path: '**', component: TemplateComponent}
];
