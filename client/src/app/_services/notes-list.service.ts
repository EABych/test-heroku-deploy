// import {Injectable} from '@angular/core';
// import {HttpClient} from '@angular/common/http';
// import {map} from 'rxjs/operators';
// import {Observable} from 'rxjs';
// import {ApiEndpointsService} from './api-endpoints.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class NotesListService {

//   constructor(
//     private http: HttpClient,
//     private API: ApiEndpointsService,
//   ) {
//   }

//   public tasksList = {};
//   public loading = true;
//   public objectKeys = Object.keys;

//   addNote(text: string, date: string): void {
//     this.API.startFetching();

//     this.API.addNewTaskForCurrentDate(text, date).subscribe(
//       res => {
//         const currentDate = this.tasksList[date];
//         if (currentDate) {
//           currentDate[res.name] = {text};
//         } else {
//           this.tasksList[date] = {[res.name]: {text}};
//         }
//         this.API.finishFetching();

//       },
//       error => {
//         console.log(error);
//         this.API.finishFetching();
//       }
//     );
//   }

//   getNotes(): void {
//     this.API.startFetching(true);

//     this.API.getAllNotesForAllDates().subscribe(
//       res => {
//         this.API.finishFetching(true);
//         this.tasksList = res;
//       },
//       error => {
//         console.log(error);
//         this.API.finishFetching(true);
//       }
//     );
//   }


//   deleteNote(id: string, date: string): void {
//     this.API.startFetching();

//     this.API.deleteTaskFromIdForCurrentDate(date, id).subscribe(
//       () => {
//         delete this.tasksList[date][id];
//         this.API.finishFetching();
//       },
//       error => {
//         console.log(error);
//         this.API.finishFetching();
//       }
//     );
//   }
// }
