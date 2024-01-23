import {Injectable} from "@angular/core";

/*
  Ezt a servicet egyazon child routehoz tatrozó componensek használják közösen.
 */

@Injectable({
  providedIn: "root"
})
export class RouteCommonService {

  commonServiceProperty = 0;

  incrementRouteCommonServiceProperty(): void {
    ++this.commonServiceProperty;
  }

}
