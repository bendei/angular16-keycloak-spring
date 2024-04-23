import {Routes} from '@angular/router';
import {TemplateComponent} from './core/template.component';
import {NavigationErrorComponent} from "./core/navigationerror.component";
import {AuthGuard} from "./keycloak/authguard";
import {RouteCommonService} from "./core/route.common.service";
import {AuditlogComponent} from "./auditlog/auditlog.component";
import {CdComponent} from "./ChangeDetection/cd.component";
import {Cd2Component} from "./ChangeDetectionTwo/cd2.component";
import {OnpushparentComponent} from "./onpush/onpushparent.component";
import {OrderingformComponent} from "./OrderingForm/orderingform.component";
import {OrderingSignalComponent} from "./OrderingFormSignals/orderingsignal.component";
import {DeferOneComponent} from "./playingwithdefer/deferOne.component";
import {KonnektorViewComponent} from "./konnektor/konnektor-view.component";

export const APP_ROUTES: Routes = [
  /* default routing */
  {
    path: '',
    component: TemplateComponent,
    //canActivate: [navigationGuard],
    providers: [RouteCommonService],  // common service useable by all child components
    children: [
      {
        path: 'konnektor-view',
        loadComponent: () => import('../app/konnektor/konnektor-view.component').then(e => e.KonnektorViewComponent),
        data: {title: 'goiodgri'}
      },
      {
        path: "auditlog",
        loadComponent: () => import('../app/auditlog/auditlog.component').then(e => e.AuditlogComponent)
      },
      {
        path: "cd",
        loadComponent: () => import('../app/ChangeDetection/cd.component').then(e => CdComponent)
      },
      {
        path: "cd2/:routeParamOne",
        title: 'Change detection Two',
        loadComponent: () => import('../app/ChangeDetectionTwo/cd2.component').then(e => Cd2Component),
        // canActivate: [AuthGuard],
        // data: { roles: ['ADMIN'] }
      },
      {
        path: "onpush",
        loadComponent: () => import('../app/onpush/onpushparent.component').then( e => OnpushparentComponent),
      },
      {
        path: "oderingform",
        loadComponent: () => import('../app/OrderingForm/orderingform.component').then( e => OrderingformComponent),
      },
      {
        path: "oderingsignals",
        loadComponent: () => import('../app/OrderingFormSignals/orderingsignal.component').then( e => OrderingSignalComponent),
      },
      {
        path: "playingdefer",
        loadComponent: () => import('../app/playingwithdefer/deferOne.component').then( e =>DeferOneComponent),
      }
      ]
  },
  {
    path: 'navigationerror',
    component: NavigationErrorComponent
  },
 /* {
    path: 'navigation',
    loadChildren: () => import('../app/core/navigation.routing').then(r => r.NAVIGATION_ROUTES),
    //KEYCLOAK !!!!!!!! COMMENT OUT IF WANT TO RUN APP IN CHOME
  //  canActivate: [AuthGuard],
   // data: { roles: ['admin','visitor'] }
    // lazy loading  navigation child routes
    // we set loadChildren property to a dynamic function, we import the file dynamically,
    // when the file/with Routes inside is loaded, we have can load/pull in our routes definitions
  },*/
  /*
  {
    path: '',    // ha csak ennyi: localhost:4200; lazy loading single standalone component
    loadComponent: () => import('../app/core/welcome.component').then(e => e.WelcomeComponent)
  }, // accessing with outer route
  */

  {path: '**', component: TemplateComponent} // minden más url ide vezet
  //{path: '', component: WelcomeComponent}, // accessing with outer route
];
