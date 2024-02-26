import {Injectable, signal} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class ErrorsignalService {

  errors = signal<MyError[]>([]);

  addError(myerror: MyError) {
    this.errors.update((errors) => {
      errors.push(myerror);
      return errors;
    });
  }

  clearErrors() {
    this.errors.set([]);
  }
}

export interface MyError {
  message: string,
  code: number,
  statusText: string
}
