import {ChangeDetectionStrategy, Component, DoCheck, OnChanges, SimpleChanges} from "@angular/core";
import {OnpushService} from "./onpush.service";


interface User {
  name: string,
  age: number
}

@Component({
  selector: 'onpush-parent',
  templateUrl: './onpushparent.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class OnpushparentComponent implements DoCheck, OnChanges {

  szam = 0;
  user: User =  {
    name: 'pisti',
    age: 50
  }
  expressionMine = () => {
    console.log('----Parent--expressionMine--ausgewertet ');
    return "expressionMine";
  }

  constructor(private service: OnpushService) {
  }

  ngDoCheck(): void {
    console.log('---PARENT--- ngDoCheck');

  }

  public changeUserName(): void {

    this.user = {
      name: "Bob",
      age: 51
    };
  }

  public incrementSzamOnParent(): void {
    ++this.service.szam;
    this.szam = this.service.szam;  // ezt be kell újra állitani, különben hiába fut le a CD, nem lesz uj erték adva a változónak
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('---PARENT--ngOnChanges- ');
    //this.szam = this.service.szam;
  }


}
