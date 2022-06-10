import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridWrapperComponent } from './grid-wrapper/grid-wrapper.component';
import {GridsterModule} from "angular-gridster2";
import {ChartsModule} from "./charts/charts.module";
import { DashboardWrapperComponent } from './dashboard-wrapper/dashboard-wrapper.component';
import {TabMenuModule} from "primeng/tabmenu";



@NgModule({
  declarations: [
    GridWrapperComponent,
    DashboardWrapperComponent
  ],
    exports: [
        GridWrapperComponent,
        DashboardWrapperComponent
    ],
  imports: [
    CommonModule,
    GridsterModule,
    ChartsModule,
    TabMenuModule
  ]
})
export class ComponentsModule { }
