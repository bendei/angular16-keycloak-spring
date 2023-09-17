import {Routes} from '@angular/router';
import {TemplateComponent} from './core/template.component';
import {AuthGuard} from "./guard/auth.guard";

export const appRouting: Routes = [
  /* default routing */
  {path: '**', component: TemplateComponent}
];
