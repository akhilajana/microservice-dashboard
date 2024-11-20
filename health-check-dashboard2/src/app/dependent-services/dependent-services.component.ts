import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dependent-services',
  templateUrl: './dependent-services.component.html',
  styleUrls: ['./dependent-services.component.css']
})
export class DependentServicesComponent {
  @Input()
  services: any[] = [];
}