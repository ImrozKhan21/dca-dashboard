import {Component, Input, OnInit} from '@angular/core';
import {ISection} from "../../models/common.model";
import {WindowRefService} from "../../services/window-ref.service";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  @Input() section: ISection;

  constructor(private windowRef: WindowRefService) {
  }

  ngOnInit(): void {
  }

  open() {
    const url = this.section.open;
    this.windowRef.openUrl(url);
  }

}
