import { Injectable } from '@angular/core';
import { Constants } from 'src/app/config/constants';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiEndpointsService {

  public initialIsFetching = false;
  public isFetching = false;

  constructor(
    private constants: Constants,
    private http: HttpClient,
  ) { }

  public startFetching(init?: boolean): void {
    init ? this.initialIsFetching = true : this.isFetching = true;
  }

  public finishFetching(init?: boolean): void {
    init ? this.initialIsFetching = false : this.isFetching = false;
  }



  public getUserInfo(): Observable<any> {
    return this.http
      .get(`${this.constants.URL}/user`)
      .pipe(map(res => {
        return res;
      }));
  }

  public addNewTaskForCurrentDate(text: string, date: string, userId: string, userName: string): Observable<any> {
    return this.http
      .post(`${this.constants.URL}/addTodo`, {text, date, userId, userName})
      .pipe(map(res => {
        return res;
      }));
  }

  public deleteTaskFromIdForCurrentDate(date: string, id: string,  userId: string, userName: string): Observable<any> {
    return this.http
      .delete(`${this.constants.URL}/deleteTodo?date=${date}&id=${id}&userId=${userId}&userName=${userName}`);
  }

  public editTaskFromIdForCurrentDate(newValue: string, date: string, id: string,  userId: string, userName: string): Observable<any> {
    return this.http
      .put(`${this.constants.URL}/editTodo`,
        {newValue, date, id,  userId, userName}
        );
  }

  public registration(login: string, password: string, email: string ): Observable<any> {
    return this.http
      .post(`${this.constants.URL}/registration`, {login, password, email});
  }

  public login(login: string, password: string): Observable<any> {
        return this.http
        .post(`${this.constants.URL}/login`, {login, password});
    }
}
