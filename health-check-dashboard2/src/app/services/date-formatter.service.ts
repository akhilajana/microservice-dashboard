import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatterService {

  constructor(private datePipe: DatePipe) { }

  formatDeploymentDate(deploymentDate : string): any {
    //Update correct formatter
    const correctedDate = deploymentDate.replace("/", "-");
    const date = new Date(correctedDate);
    return this.datePipe.transform(date, 'MM/dd/yy, h:mm a');
  }
}
