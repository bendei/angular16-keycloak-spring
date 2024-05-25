import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  isDevMode,
  OnDestroy,provideZoneChangeDetection,
  OnInit
} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ObservableService} from "./observable.service";
import {catchError, concatMap, Observable, of, pipe, Subscription} from "rxjs";
import {DefaultService} from "../openapi-generated-sources";

@Component({
  standalone: true,
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit, OnDestroy {

  defaultService = inject(DefaultService);

  routeParamOne = "44342";
  data = 0;
  subscription!: Subscription;
  observableForAsyncPipe!: Observable<number>;

  constructor(private observableService: ObservableService, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.subscription = this.observableService.subject$.subscribe( (data) =>  {
      this.whenDataChanges(data);
      this.changeDetectorRef.markForCheck();    // to manuylly run CD if onPush

      // async pipehoz: igy nem kell manually trigger CD, és unsubscribe sem kell
      this.observableForAsyncPipe = this.observableService.subject$;
    });
  }

  private whenDataChanges(data: number) {
    this.data = data;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  playWithConcatMap() {
    this.defaultService.getAllKonnektors().pipe(
      concatMap(
        konnektors => {
          throw new Error();
          //console.table(konnektors[0].hostName);
          //return getMy("127.0.0.1");
        }
      ),
      catchError(err => {
        console.log(err);
        return of("valami gebasz történt");
      })
    ).subscribe(res => console.table(res));


    //  getNameByHostname("127.0.0.1").subscribe(result => console.log(result));
  }

}

const getMy = (hostName: string): Observable<string> =>  {
  let obs$;

  switch (hostName) {
  case "127.0.0.1": {
      obs$ = of(("elso hostName"));
      break;
    }
  case "127.0.0.2": {
      obs$ = of("masodik hostName");
      break;
    }
  case "127.0.0.3": {
      obs$ = of("harmadik hostName");
      break;
    }
  default: {
      obs$ = of("nem találtam ilyen hostName-t" + hostName);
    }
  }
  return obs$;
}

