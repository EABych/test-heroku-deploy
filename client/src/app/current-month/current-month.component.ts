import { Component, OnInit } from '@angular/core';
import {DateService} from '../_services/date.service';

@Component({
  selector: 'app-current-month',
  templateUrl: './current-month.component.html',
  styleUrls: ['./current-month.component.scss']
})
export class CurrentMonthComponent {
  constructor(public dateService: DateService) { }

  go(dir: number): void {
    this.dateService.changeMonth(dir);
  }
}
