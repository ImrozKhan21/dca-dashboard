import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridWrapperComponent} from './grid-wrapper/grid-wrapper.component';
import {GridsterModule} from "angular-gridster2";
import {ChartsModule} from "./charts/charts.module";
import {DashboardWrapperComponent} from './dashboard-wrapper/dashboard-wrapper.component';
import {TabMenuModule} from "primeng/tabmenu";
import {ProfileComponent} from './profile/profile.component';
import {TableComponent} from './table/table.component';
import {ParagraphComponent} from './paragraph/paragraph.component';
import {CountsComponent} from './counts/counts.component';
import {VideoCardComponent} from './video-card/video-card.component';
import {TableModule} from "primeng/table";
import {PipesModule} from "../pipes/pipes.module";
import {ProgressSpinnerModule} from "primeng/progressspinner";


@NgModule({
  declarations: [
    GridWrapperComponent,
    DashboardWrapperComponent,
    ProfileComponent,
    TableComponent,
    ParagraphComponent,
    CountsComponent,
    VideoCardComponent
  ],
  exports: [
    GridWrapperComponent,
    DashboardWrapperComponent
  ],
  imports: [
    CommonModule,
    GridsterModule,
    ChartsModule,
    TabMenuModule,
    TableModule,
    PipesModule,
    ProgressSpinnerModule
  ]
})
export class ComponentsModule {
}
