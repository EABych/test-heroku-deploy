import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NoteFormComponent} from './note-form.component';
import {DateService} from '../_services/date.service';
import {ApiEndpointsService} from '../_services/api-endpoints.service';
import {AccountService} from '../_services/account.service';
import {FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-popup-window',
  templateUrl: 'popup-window.component.html',
})


export class PopupWindowComponent {
  type;
  checkoutForm;

  constructor(
    public dialogRef: MatDialogRef<PopupWindowComponent>,
    public dateService: DateService,
    public API: ApiEndpointsService,
    public accountService: AccountService,
    private formBuilder: FormBuilder,

    @Inject(MAT_DIALOG_DATA) public data: NoteFormComponent) {

    this.type = data.type === 'delete';
    this.checkoutForm = this.formBuilder.group({
      value: data.value,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteNote(): void {
    this.accountService.deleteNote(
      this.data.key,
      this.dateService.activeDate.value.format('YYYYMMDD')
    );
    this.dialogRef.close();
  }

  editNote(): void {
    this.checkoutForm.value.value &&
    this.accountService.editNote(
      this.checkoutForm.value.value,
      this.data.key,
      this.dateService.activeDate.value.format('YYYYMMDD')
    );
    this.dialogRef.close();
  }

}
