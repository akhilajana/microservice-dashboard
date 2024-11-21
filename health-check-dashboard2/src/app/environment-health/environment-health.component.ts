import { Component, Input, OnInit } from '@angular/core';
import { Environment } from '../interface/microservice-interfaces';

@Component({
  selector: 'app-environment-health',
  templateUrl: './environment-health.component.html',
  styleUrls: ['./environment-health.component.css']
})
export class EnvironmentHealthComponent implements OnInit {

  @Input() environments: any;
  @Input() microservice: any;
  dependentServices = [];

  ngOnInit(): void {
  }

  filterPods(pods: any[]): any[] {
      return pods.filter(pod => pod.podName != 'dependentServices');
  }

  // Helper method to get the first key of an object
  getFirstKey(obj: { [key: string]: string }): string | undefined {
    const [key, value] = Object.entries(obj).find(([key]) => key !== 'failedPods') || [];
    return key !== undefined ? key : 'Unknown';
  }

  getDependentServiceStatus(obj: { [key: string]: string }): string {
    const [, value] = Object.entries(obj).find(([key]) => key !== 'failedPods') || [];
    return value !== undefined ? value : 'Unknown';
  }
}

