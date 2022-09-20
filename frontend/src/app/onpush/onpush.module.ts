import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {OnpushparentComponent} from "./onpushparent.component";
import {OnpushService} from "./onpush.service";
import {OnpushchildComponent} from "./onpushchild.component";

@NgModule({
  imports: [CommonModule, BrowserModule],
  declarations: [OnpushparentComponent, OnpushchildComponent],
  providers: [OnpushService]
})
export class OnpushModule {

}
