import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartsComponent} from './charts.component';
import {BarChartComponent} from './bar-chart/bar-chart.component';
import {PieChartComponent} from './pie-chart/pie-chart.component';
import {LineChartComponent} from './line-chart/line-chart.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {ChartModule} from "angular-highcharts";
import { BulletChartComponent } from './bullet-chart/bullet-chart.component';


@NgModule({
  declarations: [
    ChartsComponent,
    BarChartComponent,
    PieChartComponent,
    LineChartComponent,
    BulletChartComponent
  ],
  exports: [
    ChartsComponent
  ],
  imports: [
    CommonModule,
    NgxChartsModule,
    ChartModule
  ]
})
export class ChartsModule {
}
