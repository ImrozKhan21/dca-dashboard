import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartsComponent} from './charts.component';
import {BarChartComponent} from './bar-chart/bar-chart.component';
import {PieChartComponent} from './pie-chart/pie-chart.component';
import {LineChartComponent} from './line-chart/line-chart.component';
import {BulletChartComponent} from './bullet-chart/bullet-chart.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {HighchartsChartModule} from 'highcharts-angular';
import {LinearGaugeComponent} from './linear-gauge/linear-gauge.component';
import { RadialGaugeComponent } from './radial-gauge/radial-gauge.component';


@NgModule({
  declarations: [
    ChartsComponent,
    BarChartComponent,
    PieChartComponent,
    LineChartComponent,
    BulletChartComponent,
    LinearGaugeComponent,
    RadialGaugeComponent
  ],
  exports: [
    ChartsComponent,
    LinearGaugeComponent,
    RadialGaugeComponent
  ],
  imports: [
    CommonModule,
    NgxChartsModule,
    HighchartsChartModule
  ]
})
export class ChartsModule {
}
