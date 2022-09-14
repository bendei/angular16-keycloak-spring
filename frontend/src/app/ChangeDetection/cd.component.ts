import {AfterViewChecked, Component, DoCheck, OnChanges, SimpleChanges} from "@angular/core";

export interface User {
  name: string;
  age?: number;
}


@Component({
  selector: 'cd',
  templateUrl: './cd.component.html'
})
export class CdComponent implements OnChanges, DoCheck, AfterViewChecked {

  text = 'text';
  szam = 22;
  counterInputPropertySetter = 0;

  user : User = {
    name: 'bende',
  };

  userSet: User = {
    name: 'pisti',
    age: 50
  }

  constructor() {
    console.log("PARENT ---- constructor");
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("CdComponent ---- ngOnChanges - for primitive types");
  }

  ngDoCheck(): void {
    console.log("CdComponent ---- ngDoCheck (gets called after EVERY CD cycle!) - for object types");
  }

  public changeSzamNameInputProperty(): void {
    console.log("PARENT ---- button klikked");
    this.szam = ++this.szam;  // ha itt nem változtatom akkor a OnChange
    this.user.name = this.user.name + this.szam;
  }

  public changeChildInputWithSetter(): void {
    ++this.counterInputPropertySetter;
    this.userSet.age = 111;
  }

  ngAfterViewChecked(): void {
    console.log("PARENT ----ngAfterViewChecked (gets called after EVERY CD cycle!)");
  }

  public kiir() {
    console.log("kiir()");
    return "kiir";
  }

}
