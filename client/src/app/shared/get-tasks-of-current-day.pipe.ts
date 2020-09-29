import {Pipe, PipeTransform} from '@angular/core';
import {AccountService} from '../_services/account.service'

@Pipe({
  name: 'getTasksOfCurrentDay'
})

export class GetTasksOfCurrentDayPipe implements PipeTransform {
  constructor(
    public accountService: AccountService,
  ) {
  }

  transform(day: string): string {
    return this.accountService.user.tasksList[day] || {};
  }

}
