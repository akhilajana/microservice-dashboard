import { Component, Input, OnInit } from '@angular/core';
import { HealthCheckService } from '../services/health-check.service';
import { HealthData, MicroserviceData } from '../interface/microservice-interfaces';


@Component({
  selector: 'app-microservice-health',
  templateUrl: './microservice-health.component.html',
  styleUrls: ['./microservice-health.component.css']
})
export class MicroserviceHealthComponent implements OnInit {
  @Input() healthData: any = {};

  constructor(private healthCheckService: HealthCheckService) { }

  ngOnInit(): void {
    this.healthCheckService.getHealthCheckData().subscribe(
      data => {
        this.healthData = data;
        this.healthData = Object.entries(data)
        .map(([env, data]: [string, any]) => ({
          environment: env,
          branchName: data.branchName,
          status: Object.values(data).every((pod: any) => pod.status === 'UP') ? 'UP' : 'DOWN',
          pods: Object.entries(data)
          .map(([podName, data]: [string, any]) => ({
            podName: podName,
            status: data.status,
            systemUsage: data.systemUsage,
            memory: data.memory,
          }))
        }))
        .filter(item => item.environment != "dependentServices");

        console.log(this.healthData);
      },
      error => {
        console.error('Error fetching health data:', error);
      }
    );
  }
}