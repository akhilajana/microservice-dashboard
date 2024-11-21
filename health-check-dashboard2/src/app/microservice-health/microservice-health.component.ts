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
        this.healthData = Object.entries(data).map(([microService, data]: [string, any]) => ({
          microServiceName: microService,
          data: Object.entries(data).map(([env, data]: [string, any]) => ({
            environment: env,
            data: {
              branchName: data.branchName,
              pods: Object.entries(data)
              .map(([podName, data]: [string, any]) => ({
                podName: podName,
                status: data.status,
                systemUsage: data.systemUsage,
                memory: data.memory,
              })).filter(item => item.podName != "branchName")
            }
          })).filter(item => item.environment != "dependentServices")
        }));
        console.log("Filtered"+this.healthData);
      },
      error => {
        console.error('Error fetching health data:', error);
      }
    );  
  }

}