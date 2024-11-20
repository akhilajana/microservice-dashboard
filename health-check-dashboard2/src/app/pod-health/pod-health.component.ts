import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Pod } from '../interface/microservice-interfaces';


@Component({
  selector: 'app-pod-health',
  templateUrl: './pod-health.component.html',
  styleUrls: ['./pod-health.component.css']
})
export class PodHealthComponent implements OnInit {
  @Input() pods: { [key: string]: Pod } = {};
  
  chartOptions: ChartOptions = {
    responsive: true,
  };
  chartLabels: string[] = ['System Usage', 'Memory'];
  chartType: ChartType = 'bar';
  chartLegend = true;
  chartData: any[] = [];

  ngOnInit() {
    this.updateChartData();
  }

  updateChartData() {
    debugger;
    this.chartData = Object.keys(this.pods)
    .filter(key => key !== 'branchName')
    .map(podName => {
      const pod = this.pods[podName];
      return {
        data: [parseFloat(pod.systemUsage), parseFloat(pod.memory)],
        label: podName
      };
    });
    console.log(this.chartData);
  }
}