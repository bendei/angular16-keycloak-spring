import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {ToastService} from "../toast/toast.service";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(tap(
      {
        next: (event) => {
          const  myEvent = event as HttpEvent<any>;
          console.log(JSON.stringify(myEvent));
        },
        error: (event) => {
          const  myEvent = event as HttpEvent<any>;
          console.log(" ------------ HttpErrorInterceptor: " + event.error());
          //this.toast.error("StatusText: " + myEvent["statusText"] + " \n Message: " + myEvent["message"]);
        }
      }
    ));

  }


}
