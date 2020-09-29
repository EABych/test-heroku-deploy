import {Component, Inject} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {DateService} from '../_services/date.service';
import {ApiEndpointsService} from '../_services/api-endpoints.service';
import {AccountService} from '../_services/account.service';
import {MatDialog} from '@angular/material/dialog';
import {PopupWindowComponent} from './popup-window.component';


@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})

export class NoteFormComponent {
  checkoutForm;
  type: string;
  key: string;
  value: string;

  constructor(
    public dateService: DateService,
    private formBuilder: FormBuilder,
    public API: ApiEndpointsService,
    public accountService: AccountService,
    public dialog: MatDialog,
  ) {
    this.checkoutForm = this.formBuilder.group({
      text: '',
    });
  }

  addNewNote(): void {
    if (!this.checkoutForm.value.text){
      return;
    }
    this.accountService.addNote(
      this.checkoutForm.value.text,
      this.dateService.activeDate.value.format('YYYYMMDD')
    );
    this.checkoutForm.reset();
  }

  openDialog(data: {type: string, key: string, value: string}): void {
    this.key = data.key;
    this.type = data.type;
    this.value = data.value || '';
    const dialogRef = this.dialog.open(PopupWindowComponent, {
      width: '250px',
      data: {
        key: this.key,
        type: this.type,
        value: this.value,
      }
    });
  }

}
