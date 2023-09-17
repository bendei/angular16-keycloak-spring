import {ChangeDetectionStrategy, Component, DoCheck, OnChanges, SimpleChanges} from "@angular/core";
import {OnpushService} from "./onpush.service";
import {interval} from "rxjs";


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
  }

  public incrementSzamOnParent(): void {
    ++this.szam;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('---PARENT--ngOnChanges- ');
    //this.szam = this.service.szam;
  }


}
