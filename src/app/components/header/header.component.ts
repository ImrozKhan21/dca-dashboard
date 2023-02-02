import {ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {ReplaySubject, takeUntil} from "rxjs";
import {ApiCallsService} from "../../services/api-calls.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppStateService} from "../../services/app-state.service";
import {WindowRefService} from "../../services/window-ref.service";
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  headerDetails: any;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);


  constructor(private apiCallsService: ApiCallsService, private changeDetectorRef: ChangeDetectorRef,
              @Inject(PLATFORM_ID) private platformId: any, private activatedRoute: ActivatedRoute,
              private appStateService: AppStateService, private router: Router, private windowRefService: WindowRefService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroyed$)).subscribe(async (params) => {
      let dashboardId = params['dashboardId'];
      if (isPlatformBrowser(this.platformId) && !dashboardId) {
        dashboardId = sessionStorage.getItem('dashboardId') as string || 'member-dashboard';
      }
      this.headerDetails = (await this.apiCallsService.getHeaderDetails(dashboardId).toPromise())[0];
      console.log('111 HEADER DETAILS', this.headerDetails);
    });
  }

  goBack() {
    if (isPlatformBrowser(this.platformId)) {
      const url = this.headerDetails.linkBackTo;
      this.windowRefService.nativeWindow.open(url, '_blank');
    }
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
