import {ErrorHandler, Injectable} from "@angular/core";
import {NGXLogger} from "ngx-logger";

@Injectable({
  providedIn: "root"
  }
)
export class GlobalErrorHandler extends ErrorHandler {

  constructor(private logger: NGXLogger) {
    super();
  }

  // atepiteni signalra???!!!
  override handleError(error) {
    console.log("GlobalErrorHandler:  " + error.message)
    this.logger.info(">>>>>>>>>>>>>> " + error.message);
    this.logger.debug(">>>>>>>>>>>>>> " + error.message);
  }

}
