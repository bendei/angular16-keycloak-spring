import {Routes} from '@angular/router';
import {KonnektorViewComponent} from '../konnektor/konnektor-view.component';
import {AuditlogComponent} from '../auditlog/auditlog.component';
import {TemplateComponent} from './template.component';
import {CdComponent} from "../ChangeDetection/cd.component";
import {OnpushparentComponent} from "../onpush/onpushparent.component";
import {NavigationErrorComponent} from "./navigationerror.component";
import {Cd2Component} from "../ChangeDetectionTwo/cd2.component";

export const navigationRoutes: Routes = [
  {
    path: 'navigation',
    component: TemplateComponent,
    //canActivate: [navigationGuard],

    children: [

      {
        path: "cd2",
        component: Cd2Component
      }

    ]
  },
  {
    path: 'navigationerror',
    component: NavigationErrorComponent

  }

];
