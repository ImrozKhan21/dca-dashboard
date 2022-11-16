import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {IGlobalFilter} from "../models/common.model";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  globalFilters$: Subject<IGlobalFilter> = new Subject<IGlobalFilter>();

  constructor() { }

  applyGlobalFilter(val: IGlobalFilter) {
    this.globalFilters$.next(val);
  }

  getGlobalFilter() {
    return this.globalFilters$.asObservable();
  }
}
