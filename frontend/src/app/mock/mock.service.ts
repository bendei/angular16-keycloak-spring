import {Injectable} from "@angular/core";
import {HttpClient, HttpContext, HttpEvent, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {KonnektorDTO, KonnektorHostnameDTO} from "../openapi-generated-sources";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor(private httpClient: HttpClient) {
  }

  public getAllKonnektors(hostName?: string, serialNumber?: string, firmwareVersion?: string, hardwareVersion?: string, created?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<Array<KonnektorDTO>>;
  public getAllKonnektors(hostName?: string, serialNumber?: string, firmwareVersion?: string, hardwareVersion?: string, created?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<Array<KonnektorDTO>>>;
  public getAllKonnektors(hostName?: string, serialNumber?: string, firmwareVersion?: string, hardwareVersion?: string, created?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<Array<KonnektorDTO>>>;
  public getAllKonnektors(hostName?: string, serialNumber?: string, firmwareVersion?: string, hardwareVersion?: string, created?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {



    ///// https://www.stackhawk.com/blog/angular-cors-guide-examples-and-how-to-enable-it/
    return this.httpClient.get<Array<KonnektorDTO>>("api/konnektors");

    // wollen wir keinen server-json verwenden, dann können wir hier data gleich haedcodieren und service liefert es gleich zurück!!!
    /*const sor: KonnektorDTO[] = [{
      "id": 1,
        "serialNumber": "213232",
        "hostName": "127.0.0.2",
        "firmwareVersion": "21.11",
        "hardwareVersion": "23.33.32",
        "active": true,
        "created": "2024-01-31T16:48:24.74",
        "validUntil": "2022-12-31T21:59:59"
      },
      {
        "id": 2,
        "hostName": "127.0.0.1",
        "serialNumber": "213231",
        "firmwareVersion": "11.01",
        "hardwareVersion": "23.33.33",
        "active": true,
        "created": "2024-01-31T16:48:24.74",
        "validUntil": "2022-12-31T21:59:59"
      },
      {
        "id": 3,
        "hostName": "127.0.0.3",
        "serialNumber": "213232",
        "firmwareVersion": "11.03",
        "hardwareVersion": "23.33.33",
        "active": true,
        "created": "2024-01-31T16:48:24.74",
        "validUntil": "2022-12-31T21:59:59"
      }
    ];
    return of(sor);*/
  }

  public updateKonnektor(konnektorId: string, konnektorDTO: KonnektorDTO, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined, context?: HttpContext}): Observable<any>;
  public updateKonnektor(konnektorId: string, konnektorDTO: KonnektorDTO, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined, context?: HttpContext}): Observable<HttpResponse<any>>;
  public updateKonnektor(konnektorId: string, konnektorDTO: KonnektorDTO, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined, context?: HttpContext}): Observable<HttpEvent<any>>;
  public updateKonnektor(konnektorId: string, konnektorDTO: KonnektorDTO, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: undefined, context?: HttpContext}): Observable<any> {
return of("www");
  }

  public updateKonnektorHostname(konnektorId: string, konnektorHostnameDTO: KonnektorHostnameDTO, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined, context?: HttpContext}): Observable<any>;
  public updateKonnektorHostname(konnektorId: string, konnektorHostnameDTO: KonnektorHostnameDTO, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined, context?: HttpContext}): Observable<HttpResponse<any>>;
  public updateKonnektorHostname(konnektorId: string, konnektorHostnameDTO: KonnektorHostnameDTO, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined, context?: HttpContext}): Observable<HttpEvent<any>>;
  public updateKonnektorHostname(konnektorId: string, konnektorHostnameDTO: KonnektorHostnameDTO, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: undefined, context?: HttpContext}): Observable<any> {
    return of("www");
  }

  }
