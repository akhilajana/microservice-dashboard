import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
refreshPage() {
throw new Error('Method not implemented.');
}
microservices = ['Auth Service', 'Order Service', 'Inventory Service', 'User Service'];
  environments = ['Development', 'Staging', 'Production'];
  selectedMicroservice: string = '';
  selectedEnvironment: string = '';
  collapsibleGroups: { title: string; content: string }[] = [];

  onSearch(): void {
    // Sample logic to populate collapsible groups based on the environment
    this.collapsibleGroups = [
      {
        title: `Details for ${this.selectedEnvironment}`,
        content: `This is a detailed description of the ${this.selectedEnvironment} environment for ${this.selectedMicroservice}.`
      },
      {
        title: `Logs for ${this.selectedEnvironment}`,
        content: `Here are some logs for the ${this.selectedEnvironment} environment of ${this.selectedMicroservice}.`
      },
      {
        title: `Metrics for ${this.selectedEnvironment}`,
        content: `Performance metrics for ${this.selectedEnvironment} environment of ${this.selectedMicroservice}.`
      }
    ];
  }
}
