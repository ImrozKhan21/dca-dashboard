import { Component, OnInit } from '@angular/core';
import {Chart} from "angular-highcharts";

@Component({
  selector: 'app-bullet-chart',
  templateUrl: './bullet-chart.component.html',
  styleUrls: ['./bullet-chart.component.scss']
})
export class BulletChartComponent implements OnInit {
  chart = new Chart({
    chart: {
      type: 'bullet'
    },
    title: {
      text: null
    },
    legend: {
      enabled: false
    },
    yAxis: {
      gridLineWidth: 0
    },
    plotOptions: {
      series: {
        pointPadding: 0.25,
        borderWidth: 0,
        color: '#000',
        targetOptions: {
          width: '200%'
        }
      }
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    }
  });

  constructor() { }

  ngOnInit(): void {
  }

}
