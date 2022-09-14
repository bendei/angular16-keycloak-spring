import {AfterViewChecked, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {User} from "./cd.component";


@Component({
  selector: "cdchild",
  templateUrl: "./cdchild.component.html"
})
export class CdchildComponent implements OnInit, OnChanges, DoCheck, AfterViewChecked {

  @Input()
  szam: number;

  @Input()
  user: User;

  private _count = 0;
  private _userSet: User;

  @Input()
  set counterInputPropertySetter(counter: number) {
    this._count = counter;
    console.log("##### CHILD set method based counter: " + this._count);
  }
  get counterInputPropertySetter(): number {
    return this._count;
  }

  @Input()
  set userSet(usr: User) {
    this._userSet = usr;
    console.log("##### CHILD userSet: " + this._userSet.name);
  }
  get userSet() {
    return this._userSet;
  }

  private olduser: User;

  constructor() {
    console.log("##### CHILD ---constructor");
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log("-----CdchildComponent -" + JSON.stringify(changes));

    for (let propName in changes) {

      if (propName == 'szam') {
        console.log("##### CHILD --ngOnChanges -- propertyName: " + propName + " previousValue: " + changes[propName].previousValue
          + " currentValue: " + changes[propName].currentValue);
      }

     /* if (propName == 'user') {
        console.log("--CdchildComponent--ngOnChanges -- propertyName: " + propName + " previousValue: " + changes[propName]?.previousValue?.name
          + " currentValue: " + changes[propName]?.currentValue?.name);
        if (this.olduser?.name !== this.user.name) {
          console.log("--CdchildComponent--ngOnChanges -- old user.name:" + this.olduser?.name + ", new username: " + this.user.name);
        }
      }*/

    }

  }

  // checking data binding type Object/array
  ngDoCheck(): void {
      if (this.olduser?.name !== this.user.name) {
        console.log("##### CHILD --ngDoCheck user.name changed -- old user.name:" + this.olduser?.name + ", new username: " + this.user.name);
        this.olduser.name = this.user.name;
      } else {
        console.log("##### CHILD --ngDoCheck user.name NOT changed");
      }
  }

  ngOnInit(): void {
    this.olduser = {...this.user};
  }

  ngAfterViewChecked(): void {
    console.log("##### CHILD ----ngAfterViewChecked (gets called after EVERY CD cycle!)");
  }

}
