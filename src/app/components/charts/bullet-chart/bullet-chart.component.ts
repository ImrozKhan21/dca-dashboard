import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts";
import { Options } from "highcharts";
import HC_bullet from "highcharts/modules/bullet";

HC_bullet(Highcharts);

@Component({
  selector: 'app-bullet-chart',
  templateUrl: './bullet-chart.component.html',
  styleUrls: ['./bullet-chart.component.scss']
})
export class BulletChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;
  chartOptions: Options = {
    series: [
      {
        type: "bullet",
        data: [
          {
            y: 260,
            target: 300
          },
          {
            y: 360,
            target: 400
          }
        ]
      },
      {
        type: "bullet",
        data: [
          {
            y: 280,
            target: 250,
            color: "#c0ffee"
          }
        ]
      },
      {
        type: "bullet",
        data: [
          {
            y: 150,
            target: 250,
            color: "#bada55"
          }
        ]
      }
    ],
    tooltip: {
      pointFormat: "<b>{point.y}</b> (with target at {point.target})"
    }
  };

  newChartOptions: Options = {
    chart: {
      inverted: true,
      marginLeft: 0,
      height: 190
    },
    title: {
      text: 'Total Revenue'
    },
    legend: {
      enabled: false
    },
    xAxis: {
      categories: ['<span class="hc-cat-title">Profit</span><br/>%']
    },
    yAxis: {
      gridLineWidth: 0
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        borderRadius: 10,
        color: "#819bc2",
        targetOptions: {
          width: "20%"
        },
        grouping: false
      } as Highcharts.PlotSeriesOptions
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    }
  };

  constructor() { }

  ngOnInit(): void {
    this.chartOptions = {...this.chartOptions, ...this.newChartOptions};
    this.updateFlag = true;
  }

}
