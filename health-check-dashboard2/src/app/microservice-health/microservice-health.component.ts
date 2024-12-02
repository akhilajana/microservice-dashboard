import { Component, Input, OnInit } from '@angular/core';
import { HealthCheckService } from '../services/health-check.service';
import { HealthData, MicroserviceData } from '../interface/microservice-interfaces';
import { Subscription, interval } from 'rxjs';
import { cloneDeep } from 'lodash';
import { DateFormatterService } from '../services/date-formatter.service';

@Component({
  selector: 'app-microservice-health',
  templateUrl: './microservice-health.component.html',
  styleUrls: ['./microservice-health.component.css']
})
export class MicroserviceHealthComponent implements OnInit {
  @Input() healthData: any;

  selectedMicroservice: string = "none";
  selectedMicroserviceObj: any = '';
  selectedEnvironment: string = "none";
  filer_option_environments: any = [];
  filteredData: any;
  all_option: any = 'All';
  none_option: any = 'none';
  lastReceivedDate: Date | null = null;
  private subscription: Subscription = new Subscription();
  isLoading = false;
  isInitialLoad = true; // Track if it's the initial load


  constructor(private healthCheckService: HealthCheckService, private dateFormatterService: DateFormatterService) { }

  ngOnInit(): void {
    // Call getHealthCheckData initially
    this.fetchHealthData();

    // Set up interval to call getHealthCheckData every 5 minutes
    const fetchInterval$ = interval(5 * 60 * 1000); // 5 minutes in milliseconds
    this.subscription.add(
      fetchInterval$.subscribe(() => this.fetchHealthData(false))
    );
  }

  fetchHealthData(showSpinner: boolean = true): void {
    if (this.isInitialLoad || showSpinner) {
      this.isLoading = true; // Show spinner only for the first load or explicitly specified calls
    }
    this.healthCheckService.getHealthCheckData().subscribe(
      data => {
        this.isLoading = false;  // Stop loading, hide the spinner
        this.isInitialLoad = false; // Initial load is complete
        this.lastReceivedDate = new Date();         // Update last received date
        this.healthData = data;
        this.healthData = Object.entries(data).map(([microService, data]: [string, any]) => ({
          microServiceName: microService,
          data: Object.entries(data).map(([env, data]: [string, any]) => ({
            environment: env,
            data: {
              branchName: data.branchName,
            //  deploymentDate: this.dateFormatterService.formatDeploymentDate(data.deploymentDate),
              dependentServices: data.dependentServices,
              pods: Object.entries(data)
              .map(([podName, data]: [string, any]) => ({
                podName: podName,
                status: data.status,
                systemUsage: data.systemCpuUsage,
                memory: data.memory,
              })).filter(item => item.podName != "branchName" && item.podName != "deploymentDate")
            }
          }))
        }));
        this.filteredData = [...this.healthData];
        console.log("Filtered"+this.healthData);
      },
      error => {
        this.isLoading = false;  // Stop loading, hide the spinner
        this.isInitialLoad = false; // Avoid spinner hanging on error
        console.error('Error fetching health data:', error);
      }
    );  

    console.log('Filtered Data:', this.healthData);
  }

  onMicroServiceChange(){
    if(this.selectedMicroservice === this.all_option || this.selectedMicroservice === 'none'){
      this.filteredData = cloneDeep(this.healthData);
      if(this.selectedEnvironment === this.all_option || this.selectedEnvironment === 'none'){
        //do nothing for now
      } else{
        this.filteredData = cloneDeep(this.healthData);
        this.onEnvironmentChange1();
      }
    } else{
      if(this.selectedEnvironment === this.all_option || this.selectedEnvironment === 'none'){
        this.filer_option_environments = this.healthData.find((service: any) => {
          return service.microServiceName === this.selectedMicroservice
          }).data;

        this.filteredData = cloneDeep(this.healthData.filter((service: any) => {
          return service.microServiceName === this.selectedMicroservice
          }));
      } else{
        this.filteredData = cloneDeep(this.healthData.filter((service: any) => {
          return service.microServiceName === this.selectedMicroservice
          }));
          this.onEnvironmentChange1();
      }
    }
   
  }

  onEnvironmentChange1(){
    if(this.selectedEnvironment === this.all_option || this.selectedEnvironment === 'none'){
      this.onMicroServiceChange();
    } else{
      this.filteredData.forEach((service: any) => {
        let microService = cloneDeep(this.healthData.find((healthDataService: any) => 
           healthDataService.microServiceName === service.microServiceName
          ));
          service.data = microService.data
       });
      this.filteredData.forEach((service: any) => {
        debugger;
        let environment = service.data.find((env: any) => {
          return env.environment === this.selectedEnvironment
          });
        service.data = [environment];
     });
     console.log(this.filteredData);
    }
  }

  onEnvironmentChange(){
    if(this.selectedEnvironment === this.all_option && this.selectedMicroservice !== this.all_option){
      this.filteredData[0].data = this.filer_option_environments;
    } else if(this.selectedEnvironment === this.all_option && this.selectedMicroservice === this.all_option){
      this.filer_option_environments = [];
      this.filteredData = [...this.healthData];
    } else{
      this.filteredData[0].data =  this.filer_option_environments.filter((env: any) => {
          return env.environment === this.selectedEnvironment
        })
    }
   
  }


}