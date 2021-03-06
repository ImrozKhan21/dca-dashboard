import {Component, Input, OnInit} from '@angular/core';
import {ISection} from "../../models/common.model";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  @Input() section: ISection;

  constructor() { }

  ngOnInit(): void {
  }

}
