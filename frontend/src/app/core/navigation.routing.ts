import {Routes} from '@angular/router';
import {KonnektorViewComponent} from '../konnektor/konnektor-view.component';
import {AuditlogComponent} from '../auditlog/auditlog.component';
import {TemplateComponent} from './template.component';
import {CdComponent} from "../ChangeDetection/cd.component";
import {OnpushparentComponent} from "../onpush/onpushparent.component";
import {NavigationErrorComponent} from "./navigationerror.component";
import {Cd2Component} from "../ChangeDetectionTwo/cd2.component";

export const NAVIGATION_ROUTES: Routes = [
  {
    path: '',
    component: TemplateComponent,
    //canActivate: [navigationGuard],
    //providers: [MyCommonService]

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

  }

];
