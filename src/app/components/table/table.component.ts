import {Component, Input, OnInit} from '@angular/core';
import {ISection} from "../../models/common.model";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() section: ISection;

  constructor() { }

  ngOnInit(): void {
  }

  getCols(firstRow: any): string[] {
    return Object.keys(firstRow);
  }

}
