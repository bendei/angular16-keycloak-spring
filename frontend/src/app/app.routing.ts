import {Routes} from '@angular/router';
import {TemplateComponent} from './core/template.component';
import {compact} from "lodash";
import {WelcomeComponent} from "./core/welcome.component";

export const APP_ROUTES: Routes = [
  /* default routing */
  {path: '', component: WelcomeComponent}, // accessing with outer route
  {path: '**', component: TemplateComponent}
];
