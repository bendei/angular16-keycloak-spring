import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

/*
két  egymással semilyen kapcsolatban sem lévő komponens közötti adatcsere: Service BeahviorSubject, adatcsere, komponensek subscribolnak rá.
FIGYELEM: ha a navigation component onPush akkor alapból nem updételődik a számlálója a view-n, mert onPushkor a CD csak @Inut reference változáskor fut le:
Megoldás: see this.changeDetectorRef.markForCheck( on navigation.component
 */

@Injectable({
  providedIn: "root"
})
export class ObservableService {

  subject$ = new BehaviorSubject(<number>0);
  private commonData: number = 0;

  getCommonData(): number {
    return this.commonData;
  }

  incrementCommonServiceProperty() {
    ++this.commonData;
    this.subject$.next(this.commonData);
  }

}
