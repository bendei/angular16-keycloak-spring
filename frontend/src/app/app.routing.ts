import {Routes} from '@angular/router';
import {TemplateComponent} from './core/template.component';
import {NavigationErrorComponent} from "./core/navigationerror.component";
import {AuthGuard} from "./keycloak/authguard";

export const APP_ROUTES: Routes = [
  /* default routing */
  {
    path: 'navigationerror',
    component: NavigationErrorComponent
  },
  {
    path: 'navigation',
    loadChildren: () => import('../app/core/navigation.routing').then(r => r.NAVIGATION_ROUTES),
    canActivate: [AuthGuard],
    data: { roles: ['admin','visitor'] }
    // lazy loading  navigation child routes
    // we set loadChildren property to a dynamic function, we import the file dynamically,
    // when the file/with Routes inside is loaded, we have can load/pull in our routes definitions
  },
  /*
  {
    path: '',    // ha csak ennyi: localhost:4200; lazy loading single standalone component
    loadComponent: () => import('../app/core/welcome.component').then(e => e.WelcomeComponent)
  }, // accessing with outer route
  */

  {path: '**', component: TemplateComponent}, // minden más url ide vezet
  //{path: '', component: WelcomeComponent}, // accessing with outer route
];
