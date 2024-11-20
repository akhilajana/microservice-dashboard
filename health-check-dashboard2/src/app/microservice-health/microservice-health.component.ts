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
  healthData1: Array<{ [key: string]: string; }> = [];
  dependentServices = [];

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

    this.healthCheckService.getHealthCheckData().subscribe(
      healthData1 => {
        this.healthData1 = healthData1;

        if (
          healthData1.microservice1 &&
          healthData1.microservice1.dependentServices &&
          Array.isArray(healthData1.microservice1.dependentServices)
        ) {
          this.dependentServices = healthData1.microservice1.dependentServices;
          console.log("Dependent Services")
          console.log(this.dependentServices)
        } else {
          console.warn("Dependent services are missing or not an array.");
        }
      },
      error => {
        console.error('Error fetching health data:', error);
      }
    );
    
  }

    // Helper method to get the first key of an object
    getFirstKey(obj: { [key: string]: string }): string {
      return Object.keys(obj)[0];
    }
  
    // Helper method to get the value of the first key
    getFirstValue(obj: { [key: string]: string }): string {
      const key = this.getFirstKey(obj);
      return obj[key];
    }
}