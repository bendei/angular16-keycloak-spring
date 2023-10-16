import {Component, isDevMode, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpClient]
})
export class AppComponent implements OnInit {

  apiUrl = environment.apiUrl;

  ngOnInit(): void {
    console.log("apiUrl: " + this.apiUrl);

    if (isDevMode()) {
      console.log("DEV MODE");
    } else {
      console.log("PROD MODE");
    }
  }




}
