import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {DisplayGrid, GridsterConfig, GridsterItem, GridType} from "angular-gridster2";
import {IGlobalFilter, ISection} from "../../models/common.model";
import {combineLatest, Observable, take} from "rxjs";
import {ApiCallsService} from "../../services/api-calls.service";
import {MessageService} from "primeng/api";
import {AppStateService} from "../../services/app-state.service";

@Component({
  selector: 'app-grid-wrapper',
  templateUrl: './grid-wrapper.component.html',
  styleUrls: ['./grid-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridWrapperComponent implements OnInit {
  @Input() set sectionDetails(value: ISection[]) {
    this._sectionDetails = value;
    this.setGridOptions();
    this.setToolSectionsAndGetDetails();
  };

  get sectionDetails() {
    return this._sectionDetails;
  }

  _sectionDetails: ISection[];

  @Input() currentTab: string;
  @Input() hasGlobalDateFilter: boolean;
  options: GridsterConfig;
  dashboard: Array<GridsterItem>;
  dashboardsOverviewSectionsDetails: ISection[];
  hideLoader = false;
  gridType: GridType = GridType.ScrollVertical;

  constructor(private apiCallsService: ApiCallsService, private changeDetectorRef: ChangeDetectorRef,
              private messageService: MessageService, private appStateService: AppStateService) {
  }

  static itemChange(item: any, itemComponent: any) {
    console.info('itemChanged', item, itemComponent);
  }

  static itemResize(item: any, itemComponent: any) {
    console.info('itemResized', item, itemComponent);
  }

  ngOnInit() {
    this.appStateService.getGlobalFilter().subscribe((val: IGlobalFilter) => {
      console.log('111 VAL', val, this.currentTab);
      if (this.hasGlobalDateFilter) {
        const {fromDate, toDate, dropdownFilter} = val;
        this.setToolSectionsAndGetDetails(fromDate, toDate, dropdownFilter);
      }
    });
  }

  setGridOptions() {
    this.gridType = this.sectionDetails[0].gridType;
    this.options = {
      gridType: this.gridType || GridType.ScrollVertical,
      displayGrid: DisplayGrid.OnDragAndResize,
      margin: 10,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      keepFixedHeightInMobile: false,
      draggable: {
        enabled: false,
        dropOverItems: true
      },
      resizable: {
        enabled: true
      },
      pushItems: true,
      pushResizeItems: true,
      swapWhileDragging: true
    };
  }

  setToolSectionsAndGetDetails(fromDate?:string, toDate?:string, dropdownFilter?:string) {
    const allObs: Observable<any>[] = [];
    this.sectionDetails.forEach(section => {
      const params = {
        '@id': this.currentTab,
        '@fromDate': fromDate ? new Date(fromDate).toLocaleDateString() : undefined,
        '@toDate': toDate ? new Date(toDate).toLocaleDateString() : undefined,
        '@dropdownFilter': dropdownFilter ? dropdownFilter : undefined
      }
      const obs = this.apiCallsService.executeCinchyQueries(section.queryName, section.queryDomain, params);
      allObs.push(obs);
    })
    combineLatest(allObs).pipe(take(1)).subscribe(values => {
      this.dashboardsOverviewSectionsDetails = this.sectionDetails.map((section, i) => {
        return {...section, details: values[i]};
      });
      this.createDashboard();
      this.hideLoader = true;
      this.changeDetectorRef.detectChanges();
    }, error => {
      console.log('Error', error)
      this.hideLoader = true;
      this.showErrorMessage();
      this.changeDetectorRef.detectChanges();
    });
  }

  showErrorMessage() {
    this.messageService.add({
      severity: 'error',
      summary: 'Network error',
      detail: 'Please try again after other time'
    });
  }

  createDashboard() {
    // console.log('1111 dashboardsOverviewSectionsDetails', this.dashboardsOverviewSectionsDetails);

    const dashboard = [
      {cols: 4, rows: 2, y: 0, x: 0},
      {cols: 2, rows: 2, y: 0, x: 4},
      {cols: 2, rows: 2, y: 0, x: 6},
      {cols: 4, rows: 2, y: 2, x: 0},
      {cols: 2, rows: 2, y: 2, x: 4},
      {cols: 2, rows: 2, y: 2, x: 6},
      {cols: 4, rows: 2, y: 4, x: 0},
      {cols: 4, rows: 2, y: 4, x: 4},
      {cols: 4, rows: 2, y: 6, x: 0},
      {cols: 4, rows: 2, y: 6, x: 4}
    ];
    this.dashboard = this.dashboardsOverviewSectionsDetails.map((item, index) => {
      const lastItem = dashboard[index - 1];
      const {cols, rows, y, x} = item.cols ? item : dashboard[index] ? dashboard[index]
        : {cols: 4, rows: 2, y: (lastItem.y + 2), x: lastItem.x ? 0 : lastItem.x + 4};

      return {cols, rows: rows, y, x}
    })
    console.table(this.dashboard);
  }

  changedOptions() {
    if (this.options?.api) {
      // @ts-ignore
      this.options.api.optionsChanged();
    }
  }

  removeItem(item: GridsterItem) {
    this.dashboard?.splice(this.dashboard.indexOf(item), 1);
  }

  addItem() {
    this.dashboard?.push({cols: 0, rows: 0, x: 0, y: 0});
  }

}
