import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CommonService {

  commonServiceProperty = 0;

  constructor() {
    console.log(" ################# CommonService created");

  }

  incrementCommonServiceProperty(): void {
    ++this.commonServiceProperty;
  }

}
