import {ErrorHandler, inject, Injectable} from "@angular/core";
import {NGXLogger} from "ngx-logger";
import {ErrorsignalService} from "./errorsignal.service";

@Injectable({
  providedIn: "root"
  }
)
export class GlobalErrorHandler extends ErrorHandler {

  private errorsSignalService = inject(ErrorsignalService);

  constructor(private logger: NGXLogger) {
    super();
  }

  // atepiteni signalra???!!!
  override handleError(error) {
    console.log("GlobalErrorHandler:  " + error.message)
    this.logger.info(">>>>>>>>>>>>>> " + error.message);
    this.logger.debug(">>>>>>>>>>>>>> " + error.message);

    this.errorsSignalService.addError({message: error.message, statusText: '', code: 0});
  }

}
