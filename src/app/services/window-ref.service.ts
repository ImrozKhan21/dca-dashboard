import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";

function _window(): any {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class WindowRefService {

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {
  }

  get nativeWindow(): any {
    return _window();
  }

  isSSR(): boolean {
    return !isPlatformBrowser(this.platformId);
  }

  openUrl(url: string) {
    if (isPlatformBrowser(this.platformId) && url) {
      this.nativeWindow.open(url, '_blank');
    }
  }
}
