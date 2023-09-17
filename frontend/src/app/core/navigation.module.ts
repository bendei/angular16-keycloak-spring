import {NgModule} from '@angular/core';
import {TemplateComponent} from './template.component';
import {NavigationComponent} from './navigation.component';
import {FooterComponent} from './footer.component';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {navigationRoutes} from './navigation.routing';
import {NavigationErrorComponent} from "./navigationerror.component";


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
  RouterModule.forChild(navigationRoutes)], // mert ez egy feature module és akkor itt igy importáljuk és konfiguráunk egy Router modult
  declarations: [TemplateComponent, NavigationComponent, FooterComponent, NavigationErrorComponent]
})
export class NavigationModule {

}
