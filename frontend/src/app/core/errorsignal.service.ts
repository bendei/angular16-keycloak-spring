import {Injectable, signal} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class ErrorsignalService {

  // hasznalhatnank set et is es akkor a code alapjan minden bejyzes uique lenne es csak egyszer jelenne megcd
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
