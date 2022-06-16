import {Component, Input, OnInit} from '@angular/core';
import {ISection} from "../../../models/common.model";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  @Input() section: ISection;
  @Input() yAxisLabel: string = '';
  @Input() xAxisLabel: string = '';
  @Input() view: [number, number] = [600, 300]; // width , height
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: any = 'right';
  data: any;
  details: any;

  constructor() {
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    //  console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
    this.details = this.section.details;
    this.isDoughnut = this.section.format === 'Doughnut Chart';
    this.yAxisLabel  = this.details[0]['Y-axis'];
    this.xAxisLabel  = this.details[0]['X-axis'];
    this.data = this.details.filter((item: any) => item['Value']);
    const totalSeriesCount: number = this.details[0]['TotalDataSeriesCount'];
    this.data = this.details.map((item: any) => {
      if (totalSeriesCount > 1) {
        let series: any[] = [];
        for (let i = 1; i <= totalSeriesCount; i++) {
          const valueForDataSeries = `DataSeries-${i}`;
          const labelForDataSeries = `LabelDataSeries-${i}`;
          series.push({name: item[labelForDataSeries], value: item[valueForDataSeries]})
        }
        return {
          "name": item['Value'] || 'None',
          "series": series
        }
      }
      return {
        "name": item['Value'] || 'None',
        "value": item['DataSeries-1']
      }
    });
  }

}
