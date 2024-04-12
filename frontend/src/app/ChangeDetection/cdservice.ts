import {inject, Injectable} from "@angular/core";
import {KonnektorDTO} from "../openapi-generated-sources";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, throwError} from "rxjs";

const URL = "http://localhost:8081/api/konnektors/1";

@Injectable({
  providedIn: 'root'
})
export class Cdservice {


  private readonly httpClient = inject(HttpClient);

  getAllKonnektors(): Observable<Array<KonnektorDTO>> {
    return this.httpClient.get<Array<KonnektorDTO>>(URL).pipe(
      catchError(
        (error) => {
         console.log("error caught in service: " + error);
         return of([])
        }
      )
    );
  }

}
