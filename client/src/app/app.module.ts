import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './auth/token.interceptor';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CurrentMonthComponent} from './current-month/current-month.component';
import {CalendarComponent} from './calendar/calendar.component';
import {NoteFormComponent} from './note-form/note-form.component';
import {MomentPipe} from './shared/moment.pipe';
import {HttpClientModule} from '@angular/common/http';
import {DayToDbFormatPipe} from './shared/day-to-db-format.pipe';
import {GetTasksOfCurrentDayPipe} from './shared/get-tasks-of-current-day.pipe';
import {CountNumberOfTasksPipe} from './shared/count-number-of-tasks.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {MainComponent} from './main/main.component';
import {AngularMaterialModule} from './angular-material.module';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import {PopupWindowComponent} from './note-form/popup-window.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentMonthComponent,
    CalendarComponent,
    NoteFormComponent,
    MomentPipe,
    DayToDbFormatPipe,
    GetTasksOfCurrentDayPipe,
    CountNumberOfTasksPipe,
    LoginComponent,
    RegistrationComponent,
    MainComponent,
    PopupWindowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    AngularMaterialModule,
    FlexLayoutModule,
    CommonModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
