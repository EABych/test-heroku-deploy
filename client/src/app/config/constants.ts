import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class Constants {
  public readonly URL: string = 'http://localhost:8080';
}
