import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {CdComponent} from "./cd.component";
import {CdchildComponent} from "./cdchild.component";


@NgModule({
  imports: [
    CommonModule,
    BrowserModule
  ],
  //declarations: [CdComponent, CdchildComponent]
  }
)
export class CdModule {

}
