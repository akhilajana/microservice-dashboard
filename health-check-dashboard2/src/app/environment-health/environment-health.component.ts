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
    console.log("Environment Health component");
    console.log(this.environments);

    console.log("Environment Health component -- MicroServices");
    console.log(this.microservice);
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

