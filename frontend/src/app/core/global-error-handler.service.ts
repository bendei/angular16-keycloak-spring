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
    console.log("GlobalErrorHandler:  " + error.message);

    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
    if (chunkFailedMessage.test(error.message)) {
      if (confirm("New version available. Load New Version?")) {
        window.location.reload();
      }
    }




    this.errorsSignalService.addError({message: error.message, statusText: '', code: 0});
  }

}
