import { Component, Input } from '@angular/core';
import { Environment } from '../interface/microservice-interfaces';

@Component({
  selector: 'app-environment-health',
  templateUrl: './environment-health.component.html',
  styleUrls: ['./environment-health.component.css']
})
export class EnvironmentHealthComponent {
  @Input() environments: { [key: string]: Environment } = {};
}