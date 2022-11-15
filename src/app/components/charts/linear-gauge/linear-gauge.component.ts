import {Component, Input, OnInit} from '@angular/core';
import {Color, ScaleType} from "@swimlane/ngx-charts";
import {ISection} from "../../../models/common.model";

@Component({
  selector: 'app-linear-gauge',
  templateUrl: './linear-gauge.component.html',
  styleUrls: ['./linear-gauge.component.scss']
})
export class LinearGaugeComponent implements OnInit {
  @Input() section: ISection;
  @Input() view: [number, number] = [400, 200]; // width , height
  min: number = 0;
  max: number;
  currentValue: number;
  previousValue: number;
  units: string;
  colorScheme: Color = {
    name: 'cool',
    selectable: true,
    group: ScaleType.Time,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() {
  }

  ngOnInit(): void {
    const details = this.section.details;
    this.currentValue = details[0]['currentValue'];
    this.previousValue = details[0]['targetValue'];
    this.max = details[0]['max'];
    this.units = details[0]['units'];
  }

  formatValue() {
    return this.currentValue;
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

}
