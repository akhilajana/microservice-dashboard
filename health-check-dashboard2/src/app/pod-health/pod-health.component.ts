import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';


import { Pod } from '../interface/microservice-interfaces';
import { removePercent } from '../utils/removePercent.util';
export enum ChartType {
  BAR = 'bar',
  PIE = 'pie'
}


@Component({
  selector: 'app-pod-health',
  templateUrl: './pod-health.component.html',
  styleUrls: ['./pod-health.component.css']
})



export class PodHealthComponent implements OnInit {
  @Input() pods:Pod[] = [];
  @Input() env:any;

  chartData: any[] = [];
  memoryUsageCanvasId: any;
  systemUsageCanvasId: any;

  ngOnInit() {
    this.memoryUsageCanvasId = this.pods.map(pod => pod.podName)+ 'memory';
    this.systemUsageCanvasId = this.pods.map(pod => pod.podName) + 'systemUsage';
  }

  ngAfterViewInit(){
    this.updateChartData();
  }

  updateChartData() {
    this.initializeBarChart(this.memoryUsageCanvasId, this.pods.map(pod => pod.podName),this.pods.map(pod => removePercent(pod.memory)), 'Memory Usage' );
    this.initializeBarChart(this.systemUsageCanvasId, this.pods.map(pod => pod.podName),this.pods.map(pod => removePercent(pod.systemUsage)), 'System Usage' );
  }
  

  private initializeBarChart(canvasid: any, labels: any, values:any, title: any) : any {
    const barChartElement = document.getElementById(canvasid) as HTMLCanvasElement;
    return new Chart(barChartElement, {
      type: ChartType.BAR,
      data: {
        labels: labels = labels.map((label: string) => label.length > 15 ? label.match(/.{1,15}/g) : label),
        datasets: [{data: values,
        backgroundColor: ['rgb(0, 87, 184)', 'rgb(0,201,255)', 'rgb(73,238,220)', 'rgb(145,220,0)'],
        borderColor: ['rgb(0, 87, 184)', 'rgb(0,201,255)', 'rgb(73,238,220)', 'rgb(145,220,0)'],
        borderWidth: 3
      }]},
      options: {
        plugins: {
          title: { display: true, text: [title]},
          legend: {display: false}
        },
        scales: {
          y: {
            beginAtZero: true,  
            min: 0,
            max: 10,
            ticks: {
                stepSize: 0.25
            }}
        }
      } 
    })
}
}