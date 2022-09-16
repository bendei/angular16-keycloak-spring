import {AfterViewChecked, Component, DoCheck, OnChanges, SimpleChanges} from "@angular/core";
import {of} from "rxjs";

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

  private myoperators(): void {
    const sorozat = of([1,2,3,4,5,6]);
    sorozat.subscribe({
        next: (v) => console.log('------ ' + v),
        complete: () =>  console.log('------ completed')
      }
    );
  }

  constructor() {
    console.log("PARENT ---- constructor");
    this.conversions();
    this.myoperators();
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
  console.log('------ kiir() ');
    return "kiir";
  }

  private conversions(): void {
    let szam: any = "22";
    let value: number = szam - 11 ;
    console.log(value);

 }

}
