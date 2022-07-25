import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ApiCallsService} from "../../services/api-calls.service";
import {ISection, ITab} from "../../models/common.model";
import {MenuItem} from 'primeng/api';
import {ReplaySubject, takeUntil} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dashboard-wrapper',
  templateUrl: './dashboard-wrapper.component.html',
  styleUrls: ['./dashboard-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardWrapperComponent implements OnInit {
  tabs: ITab[];
  currentTab: string;
  items: MenuItem[];
  sectionDetails: ISection[];
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private apiCallsService: ApiCallsService, private changeDetectorRef: ChangeDetectorRef,
              @Inject(PLATFORM_ID) private platformId: any, private activatedRoute: ActivatedRoute) {
  }

  async ngOnInit() {
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroyed$)).subscribe(params => {
      let dashboardId = params['dashboardId'];
      if (this.platformId && !dashboardId) {
        dashboardId = sessionStorage.getItem('dashboardId') as string || 'member-dashboard';
      }
      this.setPageDetails(dashboardId)
    });
  }

  async setPageDetails(currentDashboardId: string) {
    this.tabs = await this.apiCallsService.getAllTabsPerDashboard(currentDashboardId).toPromise();
    this.setTabItems();
    this.currentTab = this.tabs[0].pageId;
    this.sectionDetails = await this.apiCallsService.getTabSections(this.currentTab).toPromise();
    this.changeDetectorRef.detectChanges();
  }

  setTabItems() {
    this.items = this.tabs.map(tabItem => {
      return {
        label: tabItem.pageTitle, id: tabItem.pageId,
        icon: 'pi pi-fw pi-home',
        command: () => {
          this.tabClicked(tabItem.pageId);
        }
      }
    });
  }

  async tabClicked(tabId: string) {
    this.currentTab = tabId;
    this.sectionDetails = await this.apiCallsService.getTabSections(tabId).toPromise();
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
