import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {forkJoin} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {CinchyConfig} from '@cinchy-co/angular-sdk';
import {IEnv} from "./models/common.model";
import {WindowRefService} from "./services/window-ref.service";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  enviornmentConfig: IEnv | undefined;
  fullScreenHeight: any;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, @Inject(PLATFORM_ID) private platformId: any,
              private windowRefService: WindowRefService) {
    window.addEventListener('message', this.receiveMessage, false);
    this.setRowAndFormId();
  }

  setRowAndFormId() {
    if (isPlatformBrowser(this.platformId)) {
      let dashboardId = this.getQueryStringValue('dashboardId', window.location.search);
      let rowId = this.getQueryStringValue('rowId', window.location.search);
      if (!dashboardId) {
        dashboardId = this.getQueryStringValue('dashboardId', document.referrer);
        rowId = this.getQueryStringValue('rowId', document.referrer);
      }
      dashboardId && sessionStorage.setItem('dashboardId', dashboardId);

      if (!sessionStorage.getItem('dashboardId') || dashboardId) {
        dashboardId && dashboardId != "null" ? sessionStorage.setItem('dashboardId', dashboardId) : sessionStorage.setItem('dashboardId', '');
      }
      console.log('session', sessionStorage.getItem('dashboardId'));
    }
  }

  getQueryStringValue(key: string, url: string) {
    return decodeURIComponent(url.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  }

  get envConfig(): CinchyConfig {
    return this.enviornmentConfig as CinchyConfig;
  }

  loadConfig() {
    return forkJoin(this.getEnvUrl());
  }

  getEnvUrl() {
    const url = `${this.baseUrl}assets/config.json`;
    /*    const headers = new HttpHeaders({
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
        })*/
    return this.http
      .get<any>(url).pipe(
        tap(config => {
          this.enviornmentConfig = config
        }));
  }

  receiveMessage(event: any) {
    if (event.data.toString().startsWith('[Cinchy][innerHeight]')) {
      this.fullScreenHeight = parseInt(event.data.toString().substring(21), 10) + 4;
      console.log('receiveMessage  IF', this.fullScreenHeight)
      localStorage.setItem('fullScreenHeight', this.fullScreenHeight.toString());
      const elements = document.getElementsByClassName('full-height-element');
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < elements.length; i++) {
        setTimeout(() => {
          if (window.location !== window.parent.location) {
            // @ts-ignore
            elements[i]['style'].height = this.fullScreenHeight + 'px';
          }
        }, 500)
      }
    }
  }
}
