import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { HealthCheckService } from '../services/health-check.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-health-dashboard',
  templateUrl: './health-dashboard.component.html',
  styleUrls: ['./health-dashboard.component.css']
})
export class HealthDashboardComponent implements OnInit {
  @ViewChildren('systemUsageChart') systemUsageCharts!: QueryList<ElementRef>;
  @ViewChildren('memoryUsageChart') memoryUsageCharts!: QueryList<ElementRef>;

  healthData: any;
  objectKeys = Object.keys;

  constructor(private healthCheckService: HealthCheckService) { }

  ngOnInit() {
    this.fetchHealthData();
  }

  fetchHealthData() {
    this.healthCheckService.getHealthData().subscribe(
      data => {
        this.healthData = data;
        setTimeout(() => this.createCharts(), 0);
      },
      error => {
        console.error('Error fetching health data:', error);
      }
    );
  }

  createCharts() {
    this.systemUsageCharts.forEach((chart, index) => {
      this.createChart(chart, 'System Usage', index, 'systemUsage');
    });

    this.memoryUsageCharts.forEach((chart, index) => {
      this.createChart(chart, 'Memory Usage', index, 'memory');
    });
  }

  createChart(chartRef: ElementRef, label: string, index: number, dataKey: string) {
    const ctx = chartRef.nativeElement.getContext('2d');
    const microservice = this.objectKeys(this.healthData)[index];
    const data = this.prepareChartData(this.healthData[microservice], dataKey);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [{
          label: label,
          data: data.values,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }

  prepareChartData(microserviceData: any, dataKey: string) {
    const labels: string[] = [];
    const values: number[] = [];

    for (const env in microserviceData) {
      for (const pod in microserviceData[env]) {
        labels.push(`${env}-${pod}`);
        values.push(parseFloat(microserviceData[env][pod][dataKey]));
      }
    }

    return { labels, values };
  }
}