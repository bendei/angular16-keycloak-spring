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

  {path: '', component: WelcomeComponent}, // accessing with outer route
  {path: '**', component: TemplateComponent}
];
