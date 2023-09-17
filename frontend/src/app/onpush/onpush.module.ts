import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {OnpushparentComponent} from "./onpushparent.component";
import {OnpushService} from "./onpush.service";
import {ChildAComponent} from "./childA.component";
import {ChildBComponent} from "./childB.component ";

@NgModule({
  imports: [CommonModule, BrowserModule],
  declarations: [OnpushparentComponent, ChildAComponent, ChildBComponent],
  providers: [OnpushService]
})
export class OnpushModule {

}
