/**
 * Bende REST interface
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec
        }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

// @ts-ignore
import { ApiError } from '../model/apiError';
// @ts-ignore
import { ArtistResponseDTO } from '../model/artistResponseDTO';
// @ts-ignore
import { AuditLogDTO } from '../model/auditLogDTO';
// @ts-ignore
import { CreateAuditLogRequestDTO } from '../model/createAuditLogRequestDTO';
// @ts-ignore
import { EmployeesResponseDTO } from '../model/employeesResponseDTO';
// @ts-ignore
import { KonnektorDTO } from '../model/konnektorDTO';
// @ts-ignore
import { KonnektorHostnameDTO } from '../model/konnektorHostnameDTO';

// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';



@Injectable({
  providedIn: 'root'
})
export class DefaultService {

    protected basePath = 'http://localhost:8081';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }


    private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
        if (value == null) {
            return httpParams;
        }

        if (typeof value === "object") {
            if (Array.isArray(value)) {
                (value as any[]).forEach( elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            } else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key,
                        (value as Date).toISOString().substr(0, 10));
                } else {
                   throw Error("key may not be null if value is Date");
                }
            } else {
                Object.keys(value).forEach( k => httpParams = this.addToHttpParamsRecursive(
                    httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        } else if (key != null) {
            httpParams = httpParams.append(key, value);
        } else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }

    /**
     * @param createAuditLogRequestDTO 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createAuditLog(createAuditLogRequestDTO: CreateAuditLogRequestDTO, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined,}): Observable<any>;
    public createAuditLog(createAuditLogRequestDTO: CreateAuditLogRequestDTO, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined,}): Observable<HttpResponse<any>>;
    public createAuditLog(createAuditLogRequestDTO: CreateAuditLogRequestDTO, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined,}): Observable<HttpEvent<any>>;
    public createAuditLog(createAuditLogRequestDTO: CreateAuditLogRequestDTO, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: undefined,}): Observable<any> {
        if (createAuditLogRequestDTO === null || createAuditLogRequestDTO === undefined) {
            throw new Error('Required parameter createAuditLogRequestDTO was null or undefined when calling createAuditLog.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }



        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<any>(`${this.configuration.basePath}/audit-log`,
            createAuditLogRequestDTO,
            {
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * creates a new konnektor
     * @param konnektorDTO 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createKonnektor(konnektorDTO: KonnektorDTO, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined,}): Observable<any>;
    public createKonnektor(konnektorDTO: KonnektorDTO, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined,}): Observable<HttpResponse<any>>;
    public createKonnektor(konnektorDTO: KonnektorDTO, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined,}): Observable<HttpEvent<any>>;
    public createKonnektor(konnektorDTO: KonnektorDTO, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: undefined,}): Observable<any> {
        if (konnektorDTO === null || konnektorDTO === undefined) {
            throw new Error('Required parameter konnektorDTO was null or undefined when calling createKonnektor.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }



        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<any>(`${this.configuration.basePath}/konnektors`,
            konnektorDTO,
            {
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * deleteing a konnektor
     * @param konnektorId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteKonnektor(konnektorId: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined,}): Observable<any>;
    public deleteKonnektor(konnektorId: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined,}): Observable<HttpResponse<any>>;
    public deleteKonnektor(konnektorId: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined,}): Observable<HttpEvent<any>>;
    public deleteKonnektor(konnektorId: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: undefined,}): Observable<any> {
        if (konnektorId === null || konnektorId === undefined) {
            throw new Error('Required parameter konnektorId was null or undefined when calling deleteKonnektor.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }



        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.delete<any>(`${this.configuration.basePath}/konnektors/${encodeURIComponent(String(konnektorId))}`,
            {
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Returns a list of artists
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllArtists(observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json',}): Observable<Array<ArtistResponseDTO>>;
    public getAllArtists(observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json',}): Observable<HttpResponse<Array<ArtistResponseDTO>>>;
    public getAllArtists(observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json',}): Observable<HttpEvent<Array<ArtistResponseDTO>>>;
    public getAllArtists(observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json',}): Observable<any> {

        let localVarHeaders = this.defaultHeaders;

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }



        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<Array<ArtistResponseDTO>>(`${this.configuration.basePath}/artists`,
            {
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Return list of all employees
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllEmployees(observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json',}): Observable<Array<EmployeesResponseDTO>>;
    public getAllEmployees(observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json',}): Observable<HttpResponse<Array<EmployeesResponseDTO>>>;
    public getAllEmployees(observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json',}): Observable<HttpEvent<Array<EmployeesResponseDTO>>>;
    public getAllEmployees(observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json',}): Observable<any> {

        let localVarHeaders = this.defaultHeaders;

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }



        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<Array<EmployeesResponseDTO>>(`${this.configuration.basePath}/employees`,
            {
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * gets all konnektors
     * @param hostName hostName of the connector
     * @param serialNumber serialNumber of the connector
     * @param firmwareVersion firmwareVersion of the connector
     * @param hardwareVersion hardwareVersion of the connector
     * @param created created of the connector
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllKonnektors(hostName?: string, serialNumber?: string, firmwareVersion?: string, hardwareVersion?: string, created?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json',}): Observable<Array<KonnektorDTO>>;
    public getAllKonnektors(hostName?: string, serialNumber?: string, firmwareVersion?: string, hardwareVersion?: string, created?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json',}): Observable<HttpResponse<Array<KonnektorDTO>>>;
    public getAllKonnektors(hostName?: string, serialNumber?: string, firmwareVersion?: string, hardwareVersion?: string, created?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json',}): Observable<HttpEvent<Array<KonnektorDTO>>>;
    public getAllKonnektors(hostName?: string, serialNumber?: string, firmwareVersion?: string, hardwareVersion?: string, created?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json',}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (hostName !== undefined && hostName !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>hostName, 'hostName');
        }
        if (serialNumber !== undefined && serialNumber !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>serialNumber, 'serialNumber');
        }
        if (firmwareVersion !== undefined && firmwareVersion !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>firmwareVersion, 'firmwareVersion');
        }
        if (hardwareVersion !== undefined && hardwareVersion !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>hardwareVersion, 'hardwareVersion');
        }
        if (created !== undefined && created !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>created, 'created');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }



        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<Array<KonnektorDTO>>(`${this.configuration.basePath}/konnektors`,
            {
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAuditLog(observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json',}): Observable<Array<AuditLogDTO>>;
    public getAuditLog(observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json',}): Observable<HttpResponse<Array<AuditLogDTO>>>;
    public getAuditLog(observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json',}): Observable<HttpEvent<Array<AuditLogDTO>>>;
    public getAuditLog(observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json',}): Observable<any> {

        let localVarHeaders = this.defaultHeaders;

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }



        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<Array<AuditLogDTO>>(`${this.configuration.basePath}/audit-log`,
            {
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param konnektorId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getKonnektor(konnektorId: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json',}): Observable<KonnektorDTO>;
    public getKonnektor(konnektorId: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json',}): Observable<HttpResponse<KonnektorDTO>>;
    public getKonnektor(konnektorId: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json',}): Observable<HttpEvent<KonnektorDTO>>;
    public getKonnektor(konnektorId: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json',}): Observable<any> {
        if (konnektorId === null || konnektorId === undefined) {
            throw new Error('Required parameter konnektorId was null or undefined when calling getKonnektor.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }



        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<KonnektorDTO>(`${this.configuration.basePath}/konnektors/${encodeURIComponent(String(konnektorId))}`,
            {
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update the complete konnektor
     * @param konnektorId 
     * @param konnektorDTO 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateKonnektor(konnektorId: string, konnektorDTO: KonnektorDTO, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined,}): Observable<any>;
    public updateKonnektor(konnektorId: string, konnektorDTO: KonnektorDTO, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined,}): Observable<HttpResponse<any>>;
    public updateKonnektor(konnektorId: string, konnektorDTO: KonnektorDTO, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined,}): Observable<HttpEvent<any>>;
    public updateKonnektor(konnektorId: string, konnektorDTO: KonnektorDTO, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: undefined,}): Observable<any> {
        if (konnektorId === null || konnektorId === undefined) {
            throw new Error('Required parameter konnektorId was null or undefined when calling updateKonnektor.');
        }
        if (konnektorDTO === null || konnektorDTO === undefined) {
            throw new Error('Required parameter konnektorDTO was null or undefined when calling updateKonnektor.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }



        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.put<any>(`${this.configuration.basePath}/konnektors/${encodeURIComponent(String(konnektorId))}`,
            konnektorDTO,
            {
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * updates hostname only
     * @param konnektorId 
     * @param konnektorHostnameDTO 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateKonnektorHostname(konnektorId: string, konnektorHostnameDTO: KonnektorHostnameDTO, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined,}): Observable<any>;
    public updateKonnektorHostname(konnektorId: string, konnektorHostnameDTO: KonnektorHostnameDTO, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined,}): Observable<HttpResponse<any>>;
    public updateKonnektorHostname(konnektorId: string, konnektorHostnameDTO: KonnektorHostnameDTO, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined,}): Observable<HttpEvent<any>>;
    public updateKonnektorHostname(konnektorId: string, konnektorHostnameDTO: KonnektorHostnameDTO, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: undefined,}): Observable<any> {
        if (konnektorId === null || konnektorId === undefined) {
            throw new Error('Required parameter konnektorId was null or undefined when calling updateKonnektorHostname.');
        }
        if (konnektorHostnameDTO === null || konnektorHostnameDTO === undefined) {
            throw new Error('Required parameter konnektorHostnameDTO was null or undefined when calling updateKonnektorHostname.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }



        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<any>(`${this.configuration.basePath}/konnektors/${encodeURIComponent(String(konnektorId))}`,
            konnektorHostnameDTO,
            {
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
