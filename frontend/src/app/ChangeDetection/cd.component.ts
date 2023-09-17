import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef, Input,
  NgZone,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import {of} from "rxjs";

export interface User {
  name: string;
  age?: number;
}

@Component({
  selector: 'cd',
  templateUrl: './cd.component.html'
})
export class CdComponent implements OnChanges, DoCheck, AfterViewInit, AfterViewChecked {
  counterInputPropertySetter = 0;
  text = 'text';
  _szam = 22;

  private unlistener!: () => void;

  public get szam(): number {
    console.log('PARENT -------szam getter: ' + this._szam);
    return this._szam;
  }
  public set szam(sz: number) {
    console.log('PARENT -------szam setter: ');
    this._szam = sz;
  }

  @ViewChild("movingArea", {static: false})
  public movingArea!: ElementRef;

  user : User = {
    name: 'bende',
  };

  userSet: User = {
    name: 'pisti',
    age: 50
  }

  constructor(private renderer2: Renderer2, private ngZone: NgZone) {
    console.log("PARENT ---- constructor");

    // a setTimout is triggerelni a DC-t ezért lefut az egesz DC :)
    setTimeout( () => {
      console.log("timeout");
      //this.conversions();
      //this.myoperators();
    }, 2000);


  }

  // hooks

  ngOnChanges(changes: SimpleChanges): void {
    console.log("PARENT ---- ngOnChanges - for primitive types");
  }

  ngDoCheck(): void {
    console.log("PARENT ---- ngDoCheck (gets called after EVERY CD cycle!) - for object types");
  }

  ngAfterViewInit(): void {
    console.log("Parent - ngAfterViewInit - lauft bim ");
  }

  ngAfterViewChecked(): void {
    console.log("PARENT ----ngAfterViewChecked (gets called after EVERY CD cycle!)");
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


  public kiir() {
    console.log('PARENT------ kiir() ');
    return "kiir";
  }

  public attachCoursorMovoeHandler(): void {
    this.unlistener = this.renderer2.listen(this.movingArea.nativeElement, "mousemove", event => {
      console.log(`----running outside ngZone-- ${event.clientX}, Mouse Y: ${event.clientY}`);
    });
  }

  public removeCoursorMovoeHandler(): void {
    if (this.unlistener) {
      this.unlistener();
    }
  }

  public runOutsideAngularNgZone(): void {
    this.removeCoursorMovoeHandler();
    this.ngZone.runOutsideAngular(() => {
      this.attachCoursorMovoeHandler();
    });
  }

  public runInsideAngularNgZone(): void {
    this.ngZone.run(() => {
      this.attachCoursorMovoeHandler();
    });
  }

  private conversions(): void {
    let szam: any = "22";
    let value: number = szam - 11 ;
   // console.log(value);
 }

  private myoperators(): void {
    const sorozat = of([1,2,3,4,5,6]);
    sorozat.subscribe({
        next: (v) => console.log('------ ' + v),
        complete: () =>  console.log('------ completed')
      }
    );
  }


}
