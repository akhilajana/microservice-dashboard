import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removePercent'
})
export class RemovePercentPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value; // Handle null or undefined values
    return value.replace('%', '');
  }
}
