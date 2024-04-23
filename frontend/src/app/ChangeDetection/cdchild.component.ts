import {
  AfterViewChecked, booleanAttribute,
  Component, computed,
  DoCheck,
  effect, EventEmitter, inject,
  input,
  Input,
  OnChanges,
  OnInit, output, Output, signal,
  SimpleChanges
} from "@angular/core";
import {User, UserInterface} from "./cd.component";
import {SimpleService} from "./simple.service";
import {from} from "rxjs";
import {outputFromObservable} from "@angular/core/rxjs-interop";
import {FormsModule} from "@angular/forms";


@Component({
  standalone: true,
  selector: "cdchild",
  templateUrl: "./cdchild.component.html",
  imports: [
    FormsModule
  ],
  providers: [SimpleService]  // ebben a compban regisztráljuk, a service maga nem regisztrálja magár az @Injectable-val, igy csak ebben a child componensben érhető el
})
export class CdchildComponent implements OnInit, DoCheck {

  private simpleService = inject(SimpleService);

  _twowayBindProperty = "hahah";
  set twowayBindProperty(par: string) {
    this._twowayBindProperty = par;
    console.log("_twowayBindProperty set with value: " + par);
  }
  get twowayBindProperty() {
    console.log("_twowayBindProperty ge" );
    return this._twowayBindProperty;
  }

  szamInput = input.required<number>();
  szamEffect = effect(() => {
    console.log("szamEffect: " + this.szamInput());
  });

  // 2-way
  atpasszolni = input<string>();
  atpasszolniChange = output<string>();

  atpasszolniEffect = effect(() => {
    console.log("ez jött a parentttöl: " + this.atpasszolni());
  });


  titleSignal = signal<string>("");
  usersArr = signal<UserInterface[]>([{name: "bbb", age: 4}]);

  nulladikSignal = signal<number>(0);
  elsoSzam = signal<number>(0);
  masodikSzam = signal<number>(0);

  elsoSzamEffect = effect(() => {
    console.log("elsoSzamEffect called: " + this.elsoSzam());
  });

  computedSignal = computed(() => {
    const elso = this.elsoSzam();
    const masodik = this.masodikSzam();
    console.log("computedSignal updated");
    return elso + masodik;
  });

  @Output() childEvent: EventEmitter<string> = new EventEmitter<string>();
  myOutput = output<string>();

  myStream$ = from([1,2,3,4,5]);
  myOutputFormObservable = outputFromObservable(this.myStream$);


  constructor() {

    console.log("simpleService:" + this.simpleService.simpleSzam);
  }

  changeTwowayBindProperty(): void {
    this.twowayBindProperty = "nem haha";
  }

  emitChildEvent(): void {
    this.childEvent.emit("payload received");
  }

  ngOnInit(): void {
    setTimeout(
      () => {
        this.usersArr.update(arr => [...arr, {name: "sss", age: 33}])
      }
      , 2000
    );
  }

  firstSignalChanged(event: KeyboardEvent): void {
    const val = (event.target as HTMLInputElement).value;
    console.log("firstSignalChanged: " +  val);
    this.elsoSzam.set(Number(val));
  }
  secondSignalChanged(event: KeyboardEvent): void {
    const val = (event.target as HTMLInputElement).value;
    this.masodikSzam.set(Number(val));
    console.log("secondSignalChanged: " +  val);
  }

  szamlalo = (szam: number | undefined) : void => {
    console.log("input effect(): " + szam);
  };

  ngOnChanges(changes: SimpleChanges): void {
    console.log("child - ngOnChanges");
  }

  ngDoCheck(): void {
    console.log("child - ngDoCheck");
  }

}





