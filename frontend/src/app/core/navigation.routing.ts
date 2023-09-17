import {Routes} from '@angular/router';
import {KonnektorViewComponent} from '../konnektor/konnektor-view.component';
import {AuditlogComponent} from '../auditlog/auditlog.component';
import {TemplateComponent} from './template.component';
import {CdComponent} from "../ChangeDetection/cd.component";
import {OnpushparentComponent} from "../onpush/onpushparent.component";
import {navigationGuard} from "./navigation.guard";
import {NavigationErrorComponent} from "./navigationerror.component";

export const navigationRoutes: Routes = [
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
        path: "onpush",
        component: OnpushparentComponent
      }
    ]
  },
  {
    path: 'navigationerror',
    component: NavigationErrorComponent

  }

];
