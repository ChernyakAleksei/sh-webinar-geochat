import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: number, format: string = 'DD MM YYYY'): string {
    if (!value) {
      return null;
    }
    return moment.unix(value).format(format);
  }

}
