import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  errors$ = new BehaviorSubject<MyError[]>([]);
  myerrors: MyError[] = [];

  addError(error: MyError) {
    this.myerrors = [];
    this.myerrors.push(error);
    this.errors$.next(this.myerrors);
  }

  clearErrors() {
    this.myerrors = [];
  }

}



export interface MyError {
  message: string,
  code: number,
  statusText: string
}


