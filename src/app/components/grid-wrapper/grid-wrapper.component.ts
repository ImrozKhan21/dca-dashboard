import {Component, Input, OnInit} from '@angular/core';
import {DisplayGrid, GridsterConfig, GridsterItem, GridType} from "angular-gridster2";
import {ISection} from "../../models/common.model";
import {combineLatest, Observable, take} from "rxjs";
import {ApiCallsService} from "../../services/api-calls.service";

@Component({
  selector: 'app-grid-wrapper',
  templateUrl: './grid-wrapper.component.html',
  styleUrls: ['./grid-wrapper.component.scss']
})
export class GridWrapperComponent implements OnInit {
  @Input() sectionDetails: ISection[];
  @Input() currentTab: string;
  options: GridsterConfig;
  dashboard: Array<GridsterItem>;
  dashboardsOverviewSectionsDetails: ISection[];


  constructor(private apiCallsService: ApiCallsService) {
  }

  static itemChange(item: any, itemComponent: any) {
    console.info('itemChanged', item, itemComponent);
  }

  static itemResize(item: any, itemComponent: any) {
    console.info('itemResized', item, itemComponent);
  }

  ngOnInit() {
    this.setGridOptions();
    this.setToolSectionsAndGetDetails();

    this.dashboard = [
      {cols: 2, rows: 2, y: 0, x: 0},
      {cols: 2, rows: 2, y: 0, x: 2},
      {cols: 4, rows: 4, y: 0, x: 4},
      {cols: 2, rows: 2, y: 2, x: 0},
      {cols: 2, rows: 2, y: 2, x: 2}
    ];
    console.table(this.dashboard);
  }

  setToolSectionsAndGetDetails() {
    const allObs: Observable<any>[] = []
    this.sectionDetails.forEach(section => {
      const params = {
        '@id': this.currentTab
      }
      const obs = this.apiCallsService.executeCinchyQueries(section.queryName, section.queryDomain, params);
      allObs.push(obs);
    })
    combineLatest(allObs).pipe(take(1)).subscribe(values => {
      console.log('111 VALUES', values);
      this.dashboardsOverviewSectionsDetails = this.sectionDetails.map((section, i) => {
        return {...section, details: values[i]};
      });

      console.log('1111 dashboardsOverviewSectionsDetails', this.dashboardsOverviewSectionsDetails);
    //  this.appStateService.toolsOverview[this.toolId] = this.toolsOverviewSectionsDetails;
    //  this.changeDetectorRef.detectChanges();
    });
  }

  setGridOptions() {
    this.options = {
      gridType: GridType.Fit,
      displayGrid: DisplayGrid.OnDragAndResize,
      margin: 10,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null
    };
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
