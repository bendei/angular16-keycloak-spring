import {Routes} from '@angular/router';
import {TemplateComponent} from './core/template.component';

export const appRouting: Routes = [
  /* default routing */
  {path: '**', component: TemplateComponent}
];
