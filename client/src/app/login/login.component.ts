import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {AccountService} from '../_services/account.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  checkoutForm;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
  ) {
    this.checkoutForm = this.formBuilder.group({
      login: '',
      password: '',
    });
   }


  ngOnInit(): void {
  }

  login(): void {
    // tslint:disable-next-line:no-unused-expression
      this.checkoutForm.value.login &&
      this.checkoutForm.value.password &&
      this.accountService.login(this.checkoutForm.value);
  }

}
