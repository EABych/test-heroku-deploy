import {Component} from '@angular/core';
import {DateService} from '../_services/date.service';
import {ApiEndpointsService} from '../_services/api-endpoints.service';
import {AccountService} from '../_services/account.service'


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  constructor(
    public dateService: DateService,
    public API: ApiEndpointsService,
    public accountService: AccountService,
  ) {
  }

  changeActiveDay(day: string): void {
    this.dateService.changeActiveDate(+day > 9 ? day : ('0' + day));
  }
}
