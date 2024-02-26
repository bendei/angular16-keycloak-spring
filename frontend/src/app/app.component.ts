import {Component, ErrorHandler, isDevMode, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import { mymodulenevem, myfunction } from './myjsmoduleone';
import {GlobalErrorHandler} from "./core/global-error-handler.service";
import {Observable, of, Subscription} from "rxjs";
import {reject} from "lodash";

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpClient],
  imports: [RouterModule]
})
export class AppComponent implements OnInit, OnDestroy {

  subs: Subscription;

   async ngOnInit() {
      const prom$ = new Promise((resolve, reject) => {
    //    resolve(2222);
        reject(new Error("hiba"));
      });

    prom$.then(
      value => {
      console.log(value)
    },
      error => {
        console.log(error);
      }
      );

    const prom2$ = this.getPromise();
    const result = await prom2$;
    console.log(result);
    /////////////////////////

     const obs$ = new Observable((observer) => {
      observer.next(1111);
       observer.next(1112);
       observer.next(1113);
      observer.error(new Error("hiba"));
    });

     const obs2$ = of(1,2,3,4,5,6);

     this.subs = obs2$.subscribe( (value) => console.log("subs1: " + value));
     this.subs = obs$.subscribe( (value) => console.log("subs2: " + value));
     this.subs = obs$.subscribe( (value) => console.log("subs3: " + value));

  }

  ngOnDestroy(): void {
     this.subs.unsubscribe();
  }


  async getPromise() {
    return "wwww";
  }

}





class Ember {
  neve: string;
  kora: number

  constructor(n: string, k: number) {
    this.neve = n;
    this.kora = k;
  }
}
