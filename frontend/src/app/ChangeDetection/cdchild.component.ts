import {
  AfterViewChecked, booleanAttribute,
  Component, computed,
  DoCheck,
  effect, EventEmitter, inject,
  input,
  Input,
  OnChanges,
  OnInit, Output, signal,
  SimpleChanges
} from "@angular/core";
import {User} from "./cd.component";
import {SimpleService} from "./simple.service";


@Component({
  standalone: true,
  selector: "cdchild",
  templateUrl: "./cdchild.component.html",
  providers: [SimpleService]  // ebben a compban regisztráljuk, a service maga nem regisztrálja magár az @Injectable-val, igy csak ebben a child componensben érhető el
})
export class CdchildComponent implements OnInit, DoCheck {

  private simpleService = inject(SimpleService);

  szamInput = input.required<number>();
  szamEffect = effect(() => {
    console.log("szamEffect: " + this.szamInput());
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


  constructor() {

    console.log("simpleService:" + this.simpleService.simpleSzam);
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





