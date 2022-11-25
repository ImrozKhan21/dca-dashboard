import {Component, Input, OnInit} from '@angular/core';
import {Color, LegendPosition, ScaleType} from "@swimlane/ngx-charts";
import {ISection} from "../../../models/common.model";

@Component({
  selector: 'app-radial-gauge',
  templateUrl: './radial-gauge.component.html',
  styleUrls: ['./radial-gauge.component.scss']
})
export class RadialGaugeComponent implements OnInit {
  @Input() section: ISection;
  data: any[];
  view: [number, number] = [500, 350];
  legend: boolean = true;
  legendPosition: LegendPosition = LegendPosition.Right;

  colorScheme: Color = {
    name: 'cool',
    selectable: true,
    group: ScaleType.Time,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() {
  }

  ngOnInit() {
    this.data = this.section.details;
    setTimeout(() => {
      this.legend  = !this.section['hideLegend'];
    }, 0);
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
}
