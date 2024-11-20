import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

import { Pod } from '../interface/microservice-interfaces';
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
  @Input() microservice: any;

  chartData: any[] = [];
  memoryUsageCanvasId: any;
  systemUsageCanvasId: any;
  healthCanvasId: any;

  ngOnInit() {
    this.healthCanvasId = this.microservice.microServiceName +this.env?.environment + 'health';
    this.memoryUsageCanvasId = this.microservice.microServiceName +this.env?.environment + 'memory';
    this.systemUsageCanvasId = this.microservice.microServiceName +this.env?.environment + 'systemUsage';
  }

  ngAfterViewInit(){
    this.updateChartData();
  }

  updateChartData() {
    const podStatuses = this.pods.map( pod => pod.status === 'UP'? 100 :10);
    this.initializePieChart(this.healthCanvasId, this.pods.map(pod => pod.podName),podStatuses, 'Health' );
    this.initializeBarChart(this.memoryUsageCanvasId, this.pods.map(pod => pod.podName),this.pods.map(pod => pod.memory), 'Memory Usage' );
    this.initializeBarChart(this.systemUsageCanvasId, this.pods.map(pod => pod.podName),this.pods.map(pod => pod.systemUsage), 'System Usage' );
  }
  initializePieChart(canvasid: any, labels: any, values:any, title: any) {
    const pieChartElement = document.getElementById(canvasid) as HTMLCanvasElement;
    return new Chart(pieChartElement, {
      type: ChartType.PIE,
      data: {
        labels: labels,
        datasets: [{data: values,
        backgroundColor: ['rgb(40, 167, 69)','rgb(0,123,255)','rgb(253,126,20)','rgb(220,53,69)'],
        borderColor: ['rgb(40, 167, 69)','rgb(0,123,255)','rgb(253,126,20)','rgb(220,53,69)'],
        borderWidth: 3
      }]},
      options: {
        plugins: {
          title: { display: true, text: [title]},
          legend: {display: false}
        }
      } 
    })
  }


  private initializeBarChart(canvasid: any, labels: any, values:any, title: any) : any {
    const barChartElement = document.getElementById(canvasid) as HTMLCanvasElement;
    return new Chart(barChartElement, {
      type: ChartType.BAR,
      data: {
        labels: labels,
        datasets: [{data: values,
        backgroundColor: ['rgb(40, 167, 69)','rgb(0,123,255)','rgb(253,126,20)','rgb(220,53,69)'],
        borderColor: ['rgb(40, 167, 69)','rgb(0,123,255)','rgb(253,126,20)','rgb(220,53,69)'],
        borderWidth: 3
      }]},
      options: {
        plugins: {
          title: { display: true, text: [title]},
          legend: {display: false}
        },
        scales: {
          y: {beginAtZero: true}
        }
      } 
    })
}
}