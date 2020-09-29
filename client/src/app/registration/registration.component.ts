import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {AccountService} from '../_services/account.service'

interface IRegister {
  login: string,
  email: string,
  password: string,
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  checkoutForm;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
  ) {
    this.checkoutForm = this.formBuilder.group({
      login: '',
      email: '',
      password: '',
    });
   }


  ngOnInit(): void {
  }

  registration(): void {
    this.checkoutForm.value.login &&
    this.checkoutForm.value.password &&
    this.checkoutForm.value.email &&
    this.accountService.register(this.checkoutForm.value);
  }
}
