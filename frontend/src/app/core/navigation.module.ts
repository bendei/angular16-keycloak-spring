import {NgModule} from '@angular/core';
import {TemplateComponent} from './template.component';
import {NavigationComponent} from './navigation.component';
import {FooterComponent} from './footer.component';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {navigationRoutes} from './navigation.routing';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
  RouterModule.forChild(navigationRoutes)],
  declarations: [TemplateComponent, NavigationComponent, FooterComponent]
})
export class NavigationModule {

}
