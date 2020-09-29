import {Pipe, PipeTransform} from '@angular/core';
import {DateService} from '../_services/date.service';

@Pipe({
  name: 'dayToDbFormat',
  pure: false,
})
export class DayToDbFormatPipe implements PipeTransform {

  constructor(
    public dateService: DateService,
  ) {
  }

  transform(day: number): string {
    return this.dateService.date.value.format('YYYYMM') + (day > 9 ? day : ('0' + day));
  }

}
