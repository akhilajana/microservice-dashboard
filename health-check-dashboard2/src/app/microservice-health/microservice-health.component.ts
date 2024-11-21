import { Component, Input, OnInit } from '@angular/core';
import { HealthCheckService } from '../services/health-check.service';
import { HealthData, MicroserviceData } from '../interface/microservice-interfaces';
import { Subscription, interval } from 'rxjs';


@Component({
  selector: 'app-microservice-health',
  templateUrl: './microservice-health.component.html',
  styleUrls: ['./microservice-health.component.css']
})
export class MicroserviceHealthComponent implements OnInit {
  @Input() healthData: any;

  selectedMicroservice: string = '';
  selectedMicroserviceObj: any = '';
  selectedEnvironment: string = '';
  filer_option_environments: any = [];
  filteredData: any;
  all_option: any = 'All';
  lastReceivedDate: Date | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private healthCheckService: HealthCheckService) { }

  ngOnInit(): void {
    // Call getHealthCheckData initially
    this.fetchHealthData();

    // Set up interval to call getHealthCheckData every 5 minutes
    const fetchInterval$ = interval(5 * 60 * 1000); // 5 minutes in milliseconds
    this.subscription.add(
      fetchInterval$.subscribe(() => this.fetchHealthData())
    );
  }

  fetchHealthData(): void {
    this.healthCheckService.getHealthCheckData().subscribe(
      data => {
        this.healthData = data;
        this.healthData = Object.entries(data).map(([microService, data]: [string, any]) => ({
          microServiceName: microService,
          data: Object.entries(data).map(([env, data]: [string, any]) => ({
            environment: env,
            data: {
              branchName: data.branchName,
              dependentServices: data.dependentServices,
              pods: Object.entries(data)
              .map(([podName, data]: [string, any]) => ({
                podName: podName,
                status: data.status,
                systemUsage: data.systemUsage,
                memory: data.memory,
              })).filter(item => item.podName != "branchName")
            }
          }))
        }));
        this.filteredData = [...this.healthData];
        console.log("Filtered"+this.healthData);
      },
      error => {
        console.error('Error fetching health data:', error);
      }
    );  

    // Update last received date
    this.lastReceivedDate = new Date();

    console.log('Filtered Data:', this.healthData);
    console.log('Last Received Date:', this.lastReceivedDate);
  }


  onMicroServiceChange(){
    console.log(this.filer_option_environments);
    if(this.selectedMicroservice === this.all_option){
      this.filteredData = [...this.healthData];
    } else{
      this.filer_option_environments = this.healthData.filter((service: any) => {
        return service.microServiceName === this.selectedMicroservice
        })[0].data;
      this.filteredData =  this.healthData.filter((service: any) => {
        return service.microServiceName === this.selectedMicroservice
        });
    }
   
  }
  // else if(this.selectedEnvironment !== this.all_option && this.selectedMicroservice === this.all_option){
  //   this.filteredData = this.filteredData.map((service: any) => {
  //     service.data = service.data.filter((env: any) => {
  //       return env.environment === this.selectedEnvironment
  //     })
  //   })
  // }
  
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