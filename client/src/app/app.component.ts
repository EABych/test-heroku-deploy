import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ApiEndpointsService} from './_services/api-endpoints.service';
import {AccountService} from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  constructor(
    public dialog: MatDialog,
    public API: ApiEndpointsService,
    public accountService: AccountService,  
  ) {}
  
  logout(): void {
    this.accountService.logout()
  }
}

