import {Injectable, Input} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import * as moment from 'moment';


enum WeekNamesDaysList {
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
}

@Injectable({
  providedIn: 'root',
})
export class DateService {
  @Input() weekNames = WeekNamesDaysList;

  constructor() { }

  public date: BehaviorSubject<moment.Moment> = new BehaviorSubject<moment.Moment>(moment());
  public weekKeys = Object.keys(this.weekNames).filter(k => typeof this.weekNames[k as any] === 'number');

  private firstDay: moment.Moment = this.date.value.clone().startOf('month');
  private lastDay: number = +this.date.value.clone().endOf('month').format('DD');

  public month: Array<any> = [
    ...new Array(+this.firstDay.format('d')).fill(''),
    ...(() => {
      const arr =  Array.from(Array(+this.lastDay + 1).keys());
      arr.shift();
      return arr;
    })(),
  ];

  public activeDate = new BehaviorSubject<moment.Moment>(moment());
  public currentDate = new BehaviorSubject<moment.Moment>(moment());


  changeMonth(dir: number): void {
    const value = this.date.value.add(dir, 'month');
    const newFirstDay = value.clone().startOf('month');
    const newLastDay = +value.clone().endOf('month').format('DD');


    this.date.next(value);
    this.firstDay = newFirstDay;
    this.lastDay = newLastDay;
    this.month = [
      ...new Array(+newFirstDay.format('d')).fill(''),
      ...(() => {
        const arr =  Array.from(Array(+newLastDay + 1).keys());
        arr.shift();
        return arr;
      })(),
    ];
  }

  changeActiveDate(date: string): void {
    this.activeDate.next(moment(`${this.date.value.clone().format('YYYYMM')}${date}`, 'YYYYMMDD'));
  }
}
