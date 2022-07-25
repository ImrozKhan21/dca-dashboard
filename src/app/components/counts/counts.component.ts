import {Component, Input, OnInit} from '@angular/core';
import {ICount, ISection} from "../../models/common.model";
import {WindowRefService} from "../../services/window-ref.service";

@Component({
  selector: 'app-counts',
  templateUrl: './counts.component.html',
  styleUrls: ['./counts.component.scss']
})
export class CountsComponent implements OnInit {
  @Input() section: ISection;
  count: ICount;

  constructor(private windowRef: WindowRefService) {
  }

  ngOnInit(): void {
    this.count = this.section.details[0];
  }

  open() {
    const url = this.section.open;
    this.windowRef.openUrl(url);
  }

}
