import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {Cd2Component} from "./cd2.component";
import {Cd2child1Component} from "./cd2child1.component";

@NgModule({
  imports: [BrowserModule, CommonModule],
  declarations: [Cd2Component, Cd2child1Component]
})
export class Cd2Module {

}
