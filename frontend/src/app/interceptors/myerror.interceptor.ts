import {HttpInterceptorFn} from "@angular/common/http";
import {catchError, of, throwError} from "rxjs";
import {inject} from "@angular/core";
import {ErrorService, MyError} from "../core/error.service";
import {ErrorsignalService} from "../core/errorsignal.service";

export const myErrorInterceptor: HttpInterceptorFn = (req, next) => {

  const errorService = inject(ErrorService);
  const errorsignalService = inject(ErrorsignalService);

  return next(req).pipe(
    catchError((error) => {
      if ([504].includes(error.status)) {

        const myError: MyError = {
          message: error.message,
          statusText: error.statusText,
          code: error.status
        }
        console.log("....myErrorInterceptor")
        if (errorService) errorService.addError(myError);
        if (errorsignalService) errorsignalService.addError(myError);
      }

     //return throwError(() => error);
      return of();
    })
  );

};
