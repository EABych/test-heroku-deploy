import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: MainComponent,  canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: '**', component: MainComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
  providers: [
    AuthService,
    AuthGuard
  ],
})

export class AppRoutingModule {}
