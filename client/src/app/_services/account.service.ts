import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import {ApiEndpointsService} from './api-endpoints.service';
import {AuthService} from '../auth/auth.service';


export class User {
  id: string;
  login: string;
  email: string;
  tasksList: any;
}

export class IUserRes {
  email: string;
  password: string;
  tasksList: any;
}

@Injectable({providedIn: 'root'})
export class AccountService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private API: ApiEndpointsService,
    private _snackBar: MatSnackBar,
    private auth: AuthService,
  ) {
  }

  public user = {
    id: '',
    login: '',
    email: '',
    tasksList: {},
  };
  public loading = true;
  public objectKeys = Object.keys;


  // user API
  login({login, password}): void {
    this.API.startFetching(true);
    this.API.login(login, password).subscribe(
      res => {
        this.API.finishFetching(true);
        const {accessToken, ...user} = res;
        this.auth.sendToken(accessToken);
        this.user = {tasksList: {}, ...user};
        this.router.navigate(['/']);
      },
      error => {
        this._snackBar.open(error.error, 'x', {
          duration: 1500,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.API.finishFetching(true);
      }
    );
  }

  logout(): void {
    this.user = {
      id: '',
      login: '',
      email: '',
      tasksList: {},
    };
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  register({login, password, email}): void {
    this.API.startFetching(true);

    this.API.registration(login, password, email).subscribe(
      res => {
        this.API.finishFetching(true);
        const {accessToken, ...user} = res;
        this.auth.sendToken(accessToken);
        this.user = {tasksList: {}, ...user};
        this.router.navigate(['/']);
      },
      error => {
        this._snackBar.open(error.error, 'x', {
          duration: 1500,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.API.finishFetching(true);
      }
    );
  }

  getUserInfo(): void {
    this.API.startFetching(true);
    this.API.getUserInfo().subscribe(
      res => {
        this.API.finishFetching(true);
        this.user = {tasksList: {}, ...res};
      },
      () => {
        this.router.navigate(['login']);
        this.API.finishFetching(true);
      }
    );
  }

  // notes API
  addNote(text: string, date: string): void {
    this.API.startFetching();
    const {id, login} = this.user;
    this.API.addNewTaskForCurrentDate(text, date, id, login).subscribe(
      res => {
        const currentDate = this.user.tasksList[date];
        if (currentDate) {
          currentDate[res.key] = text;
        } else {
          this.user.tasksList[date] = {[res.key]: text};
        }
        this.API.finishFetching();
      },
      error => {
        this.API.finishFetching();
      }
    );
  }

  deleteNote(noteId: string, date: string): void {
    this.API.startFetching();
    const {id, login} = this.user;
    this.API.deleteTaskFromIdForCurrentDate(date, noteId, id, login).subscribe(
      () => {
        delete this.user.tasksList[date][noteId];
        this.API.finishFetching();
      },
      error => {
        this.API.finishFetching();
      }
    );
  }

  editNote(newValue: string, noteId: string, date: string): void {
    this.API.startFetching();
    const {id, login} = this.user;
    this.API.editTaskFromIdForCurrentDate(newValue, date, noteId, id, login).subscribe(
      () => {
        this.user.tasksList[date][noteId] = newValue;
        this.API.finishFetching();
      },
      error => {
        this.API.finishFetching();
      }
    );
  }

}
