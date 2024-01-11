import {ChangeDetectionStrategy, Component, DoCheck, Input, OnChanges, SimpleChanges} from "@angular/core";
import {reject} from "lodash";
import {Observable, of} from "rxjs";
import {DefaultService, KonnektorDTO} from "../../../target/generated-sources/openapi";
import {map} from "rxjs/operators";

@Component({
  standalone: true,
  selector: 'childB',
  templateUrl: './childB.component.html',
  providers: [DefaultService]
 // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildBComponent implements DoCheck, OnChanges {

  private _c2text = 'c2textem';

  _szam: number;
  @Input()
  get szam(): number {   return  this._szam; console.log("-----child B - get szam callled"); };
  set szam(sz: number) {this._szam = sz;  console.log("-----child B - set szam callled");}


  _name: string;
  @Input()
  get name(): string { return this._name; }
  set name(name: string) {
    this._name = (name && name.trim()) || '<no name set>';
  }

  constructor(private readonly defaultService: DefaultService) {
  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log("-----Child B ngOnChanges");
  }

  // checking data binding type Object/array
  ngDoCheck(): void {
    console.log("-----Child B ngDoCheck");
  }

  public get c2text() {
    console.log('--CD run: CHILD B-c2text reeavluated--get- ');
    return this._c2text;
  }
  public set c2text(c2: string) {
    console.log('-CD run: CHILD B--c2text reeavluated--set- ');
    this._c2text = c2;
  }

  // playing with Promise:
  withPromise() {

    let promise = new Promise( (resolve, reject) => {
     // resolve("EEE");
      reject(new Error("wwww"));
    });

    promise.then(result => alert(result), error => alert(error) ).finally(() => alert("finally run"));
  }

  withObservable() {

  /*  let konn1 : KonnektorDTO = {
      id: 1,
      hostName: "http:pisti"
    };

    const obs = of([konn1])
    let oberver = {
      next: (value) => {
        alert("next:" + value)
      },
      complete: () => {
        alert("complete")
      },
      error: (error) => {
        alert("error")
      }
    };

    obs.pipe(
      map( (konnektorArray) =>
        konnektorArray.map(konn => ({  // itt már kell a ( és a { !!!
          ...konn,
          hostNameAndSerial: `${konn.hostName} - ${konn.serialNumber}`,
          mappedDate: new Date().toISOString()
        }))
      )
    ).subscribe({
        next: (value) => {
          alert("next:" + value[0].hostName)
        },
        complete: () => {
          alert("complete")
        },
        error: (error) => {
          alert("error")
        }
      }
    );
*/


    this.defaultService.getAllKonnektors()
      .pipe(
        map( (konnektorArray) =>
          konnektorArray.map(konn => ({  // itt már kell a ( és a { !!!
            ...konn,
            hostNameAndSerial: `${konn.hostName} - ${konn.serialNumber}`,
            mappedDate: new Date().toISOString()
          }))
        )
      )
      .subscribe({
        next: (value) => {
          console.log('------ ' + value[0].hostNameAndSerial + ", :" + value[0].hostName + ", mappedDate: " + value[0].mappedDate);
        }
      }
  );


  }

}
