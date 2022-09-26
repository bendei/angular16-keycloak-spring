import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {OnpushparentComponent} from "./onpushparent.component";
import {OnpushService} from "./onpush.service";
import {OnpushchildComponent} from "./onpushchild.component";
import {Child2Component} from "./child2.component ";

@NgModule({
  imports: [CommonModule, BrowserModule],
  declarations: [OnpushparentComponent, OnpushchildComponent, Child2Component],
  providers: [OnpushService]
})
export class OnpushModule {

}
