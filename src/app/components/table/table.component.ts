import {Component, Input, OnInit} from '@angular/core';
import {ISection} from "../../models/common.model";
import {WindowRefService} from "../../services/window-ref.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() section: ISection;

  constructor(private windowRef: WindowRefService) {
  }


  ngOnInit(): void {
  }

  getCols(firstRow: any): string[] {
    return firstRow ? Object.keys(firstRow) : [];
  }

  open() {
    const url = this.section.open;
    this.windowRef.openUrl(url);
  }

}
