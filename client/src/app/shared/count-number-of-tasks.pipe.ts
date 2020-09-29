import {Pipe, PipeTransform} from '@angular/core';
import {AccountService} from '../_services/account.service'

@Pipe({
  name: 'countNumberOfTasks',
  pure: false,
})
export class CountNumberOfTasksPipe implements PipeTransform {

  constructor(
    public accountService: AccountService,
  ) {
  }

  transform(day: string): number {
    return this.accountService.objectKeys(this.accountService.user.tasksList[day] || {}).length;
  }
}
