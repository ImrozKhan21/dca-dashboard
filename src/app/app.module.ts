import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GridsterModule} from "angular-gridster2";
import {ComponentsModule} from "./components/components.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CinchyConfig, CinchyModule, CinchyService} from "@cinchy-co/angular-sdk";
import {ConfigService} from "./config.service";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";


export function appLoadFactory(config: ConfigService) {
  return () => config.loadConfig().toPromise();
}

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        GridsterModule,
        ComponentsModule,
        CinchyModule.forRoot(),
        ToastModule,
    ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appLoadFactory,
      deps: [ConfigService],
      multi: true
    },
    CinchyModule,
    CinchyService,
    {
      provide: CinchyConfig,
      useFactory: (config: ConfigService) => {
        return config.envConfig;
      },
      deps: [ConfigService]
    },
    {provide: 'BASE_URL', useFactory: getBaseUrl},
    MessageService
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
