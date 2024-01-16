import {ErrorHandler, Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class GlobalErrorHandlerService extends ErrorHandler {

  constructor() {
    super();
    console.log("GlobalErrorHandlerService");
  }

  override handleError(error) {
    console.log("GlobalErrorHandlerService handling: " + error.message);
  }

}
