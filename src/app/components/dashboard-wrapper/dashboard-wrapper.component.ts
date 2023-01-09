import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ApiCallsService} from "../../services/api-calls.service";
import {IGlobalFilter, IOption, ISection, ITab} from "../../models/common.model";
import {MenuItem} from 'primeng/api';
import {ReplaySubject, takeUntil} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AppStateService} from "../../services/app-state.service";

@Component({
  selector: 'app-dashboard-wrapper',
  templateUrl: './dashboard-wrapper.component.html',
  styleUrls: ['./dashboard-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardWrapperComponent implements OnInit {
  tabs: ITab[];
  currentTabDetails: ITab;
  currentTab: string;
  items: MenuItem[];
  sectionDetails: ISection[];
  fromDate: any;
  toDate: any;
  selectedDropdownFilter: IOption;
  dropdownFilterOptions: IOption[];
  filteredAutoCompleteOptions: IOption[];
  showLoader: boolean;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private apiCallsService: ApiCallsService, private changeDetectorRef: ChangeDetectorRef,
              @Inject(PLATFORM_ID) private platformId: any, private activatedRoute: ActivatedRoute,
              private appStateService: AppStateService) {
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
    this.currentTabDetails = this.tabs[0];
    this.currentTab = this.currentTabDetails.pageId;
    this.getDrodpdownFilterOptions();
    this.sectionDetails = await this.apiCallsService.getTabSections(this.currentTab).toPromise();
    this.changeDetectorRef.detectChanges();
  }

  async getDrodpdownFilterOptions() {
    if (this.currentTabDetails.isGlobalDropdownFilter === 'Yes') {
      const {dropdownQueryDomain, dropdownQueryName} = this.currentTabDetails;
      this.dropdownFilterOptions = await this.apiCallsService.executeCinchyQueries(dropdownQueryName, dropdownQueryDomain).toPromise();
      this.filteredAutoCompleteOptions = [...this.dropdownFilterOptions];
    }
  }

  setTabItems() {
    this.items = this.tabs.map(tabItem => {
      return {
        label: tabItem.pageTitle, id: tabItem.pageId,
        icon: `pi pi-fw ${tabItem.icon}`,
        command: () => {
          this.tabClicked(tabItem.pageId);
        }
      }
    });
  }

  async tabClicked(tabId: string) {
    this.showLoader = true;
    this.clearFilters();
    this.currentTab = tabId;
    this.currentTabDetails = this.tabs.find(tab => tab.pageId === tabId) as ITab;
    this.getDrodpdownFilterOptions();
    this.sectionDetails = await this.apiCallsService.getTabSections(tabId).toPromise();
    this.showLoader =false;
    this.changeDetectorRef.detectChanges();
  }

  itemSelected(event: any) {
    this.selectedDropdownFilter = event;
  }

  filterAutoCompleteOptions(event: any) {
    let query = event.query;
    this.filteredAutoCompleteOptions = this.dropdownFilterOptions.filter((item: any) => {
      return item.label?.toLowerCase().includes(query.toLowerCase());
    });
  }

  applyFilters() {
    console.log('1111 in aply filter')
    const filter: IGlobalFilter = {
      fromDate: this.fromDate, toDate: this.toDate, pageId: this.currentTab,
      dropdownFilter: this.selectedDropdownFilter?.id
    };
    console.log('1111 in aply filter 2', filter)
    this.appStateService.applyGlobalFilter(filter);
  }

  clearFilters() {
    this.fromDate = undefined;
    this.toDate = undefined;
    this.selectedDropdownFilter = {} as IOption;
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
