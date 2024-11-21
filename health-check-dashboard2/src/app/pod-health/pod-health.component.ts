import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';


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

  chartData: any[] = [];
  memoryUsageCanvasId: any;
  systemUsageCanvasId: any;
  healthCanvasId: any;

  ngOnInit() {
    this.healthCanvasId = this.pods.map(pod => pod.podName) + 'health';
    this.memoryUsageCanvasId = this.pods.map(pod => pod.podName)+ 'memory';
    this.systemUsageCanvasId = this.pods.map(pod => pod.podName) + 'systemUsage';
  }

  ngAfterViewInit(){
    this.updateChartData();
  }

  updateChartData() {
    const podStatuses = this.pods.map( pod => pod.status === 'UP'? 100 :0);
    this.initializePieChart(this.healthCanvasId, this.pods.map(pod => pod.podName),podStatuses, 'Health' );
    this.initializeBarChart(this.memoryUsageCanvasId, this.pods.map(pod => pod.podName),this.pods.map(pod => pod.memory), 'Memory Usage' );
    this.initializeBarChart(this.systemUsageCanvasId, this.pods.map(pod => pod.podName),this.pods.map(pod => pod.systemUsage), 'System Usage' );
  }
  initializePieChart(canvasid: any, labels: any, values: any, title: any) {
    const pieChartElement = document.getElementById(canvasid) as HTMLCanvasElement;
    return new Chart(pieChartElement, {
        type: ChartType.PIE,
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: ['rgb(0, 87, 184)', 'rgb(0,201,255)', 'rgb(73,238,220)', 'rgb(145,220,0)'],
                borderColor: ['rgb(0, 87, 184)', 'rgb(0,201,255)', 'rgb(73,238,220)', 'rgb(145,220,0)'],
                borderWidth: 3
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                legend: {
                    display: true,
                    position: 'top'
                },
                datalabels: {
                    display: true,
                    color: '#fff', // Text color
                    formatter: (value: any, ctx: any) => {
                        return `${value}`;
                    }
                }
            }
        },
        plugins: [ChartDataLabels] // Ensure to include the datalabels plugin
    });
}

  private initializeBarChart(canvasid: any, labels: any, values:any, title: any) : any {
    const barChartElement = document.getElementById(canvasid) as HTMLCanvasElement;
    return new Chart(barChartElement, {
      type: ChartType.BAR,
      data: {
        labels: labels,
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
            max: 100,
            ticks: {
                stepSize: 20
            }}
        }
      } 
    })
}
}