import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ConfigService} from '../config.service';
import {CinchyService} from "@cinchy-co/angular-sdk";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  constructor(private http: HttpClient, private cinchyService: CinchyService, @Inject(PLATFORM_ID) private platformId: any,
              private configService: ConfigService) {
  }

  cachedSections: any = {};
  domain: string;

  getEnvDetails(): Observable<any> {
    const url = `/API/Experiences/Get%20DX%20Environments`;
    return this.getResponse(url).pipe(
      tap(resp => {
        this.domain = resp[0].domain
      }));
  }

  getAllTabsPerDashboard(dashboardId: string): Observable<any> {
    const url = `/API/${this.domain}/Get%20Dashboard%20Pages?%40Id=${dashboardId}`;
    return this.getResponse(url);
  }

  getTabSections(tabId: string): Observable<any> {
    const url = `/API/${this.domain}/Get%20Dashboard%20Sections?%40Id=${tabId}`;
    if (this.cachedSections[tabId]) {
      return of(this.cachedSections[tabId]);
    } else {
      return this.getResponse(url).pipe(
        tap(resp => this.cachedSections[tabId] = resp)
      );
    }
  }

  //

  getResponse(url: string): Observable<any> {
    const fullUrl = `${this.configService.enviornmentConfig?.cinchyRootUrl}${url}`
    return this.http.get(fullUrl, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
      responseType: 'text'
    }).pipe(
      map(resp => {
        const {data, schema} = JSON.parse(resp);
        return this.toObjectArray(data, schema);
      }))
  }

  toObjectArray(data: any, schema: any): Array<Object> {
    let result: any = [];
    data?.forEach((row: any) => {
      let rowObject: any = {};
      for (let i = 0; i < row.length; i++) {
        rowObject[schema[i].columnName] = row[i];
      }
      result.push(rowObject);
    });
    return result;
  }

  executeCinchyQueries(name: string, domain: string, options?: any, isInsert?: boolean): Observable<any> {
    return this.cinchyService.executeQuery(domain, name, options).pipe(
      map(resp => isInsert ? resp : resp?.queryResult?.toObjectArray())
    );
  }
}
