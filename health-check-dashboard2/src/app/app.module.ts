import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BaseChartDirective } from 'ng2-charts';

import { AppComponent } from './app.component';
import { MicroserviceHealthComponent } from './microservice-health/microservice-health.component';
import { EnvironmentHealthComponent } from './environment-health/environment-health.component';
import { PodHealthComponent } from './pod-health/pod-health.component';
import { DependentServicesComponent } from './dependent-services/dependent-services.component';
import { RemovePercentPipe } from './remove-percent.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    MicroserviceHealthComponent,
    EnvironmentHealthComponent,
    PodHealthComponent,
    DependentServicesComponent,
    RemovePercentPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxPaginationModule,
    CommonModule,
    HttpClientModule,
    BaseChartDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }