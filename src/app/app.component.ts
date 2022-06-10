import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {CinchyService} from "@cinchy-co/angular-sdk";
import {isPlatformBrowser} from "@angular/common";
import {WindowRefService} from "./services/window-ref.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cinchy-dashboard';
  isLoggedIn: boolean;

  constructor(private cinchyService: CinchyService, @Inject(PLATFORM_ID) private platformId: any,
              private windowRefService: WindowRefService) {
  }

  async ngOnInit() {
    this.cinchyService.checkIfSessionValid().toPromise().then((response: any) => {
      if (response.accessTokenIsValid) {
        this.setDetails();
      } else {
        if (isPlatformBrowser(this.platformId)) {
          const url = this.windowRefService.nativeWindow.location.href;
          this.cinchyService.login(url).then(success => {
            if (success) {
              this.setDetails();
            }
          }, error => {
            console.error('Could not login: ', error)
          });
        }
      }
    })
  }

  async setDetails() {
    this.isLoggedIn = true;
  }
}
