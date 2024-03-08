import {Routes} from '@angular/router';
import {KonnektorViewComponent} from '../konnektor/konnektor-view.component';
import {AuditlogComponent} from '../auditlog/auditlog.component';
import {TemplateComponent} from './template.component';
import {CdComponent} from "../ChangeDetection/cd.component";
import {OnpushparentComponent} from "../onpush/onpushparent.component";
import {NavigationErrorComponent} from "./navigationerror.component";
import {Cd2Component} from "../ChangeDetectionTwo/cd2.component";
import {RouteCommonService} from "./route.common.service";
import {OrderingformComponent} from "../OrderingForm/orderingform.component";
import {OrderingSignalComponent} from "../OrderingFormSignals/orderingsignal.component";
import {AuthGuard} from "../keycloak/authguard";
import {DeferOneComponent} from "../playingwithdefer/deferOne.component";

export const NAVIGATION_ROUTES: Routes = [
  {
    path: '',
    component: TemplateComponent,
    //canActivate: [navigationGuard],
    providers: [RouteCommonService],

    children: [
      {
        path: 'konnektor-view',
        loadComponent: () => import('../konnektor/konnektor-view.component').then(e => e.KonnektorViewComponent)
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
        path: "cd2/:routeParamOne",
        title: 'Change detection Two',
        component: Cd2Component,
       // canActivate: [AuthGuard],
       // data: { roles: ['ADMIN'] }
      },
      {
        path: "onpush",
        component: OnpushparentComponent
      },
      {
        path: "oderingform",
        component: OrderingformComponent
      },
      {
        path: "oderingsignals",
        component: OrderingSignalComponent
      },
      {
        path: "playingdefer",
        component: DeferOneComponent
      }
    ]
  },
  {
    path: 'navigationerror',
    component: NavigationErrorComponent
  }
];
