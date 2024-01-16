import {Component, ErrorHandler, isDevMode, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../environments/environment';
import {RouterModule, RouterOutlet} from '@angular/router';

import { mymodulenevem, myfunction } from './myjsmoduleone';
import {GlobalErrorHandler} from "./core/global-error-handler.service";

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpClient, {provide: ErrorHandler, useClass: GlobalErrorHandler}],
  imports: [RouterModule]
})
export class AppComponent implements OnInit {

  apiUrl = environment.apiUrl;

  async ngOnInit(): Promise<Ember | null> {
    console.log("apiUrl: " + this.apiUrl);

    if (isDevMode()) {
      console.log("DEV MODE");

      console.log("working with module: " + mymodulenevem +  " " + myfunction(2,3));

      myfunk().then(result => {console.log(result)});


      const prom = Promise.resolve(new Ember("en pistike", 51) );
      const resu = await prom;
      const {neve} = resu;
      console.log(neve);
      return resu;
    } else {
      console.log("PROD MODE");
      return null;
    }
  }
}

async function myfunk() {
  return 1;
}

class Ember {
  neve: string;
  kora: number

  constructor(n: string, k: number) {
    this.neve = n;
    this.kora = k;
  }
}
