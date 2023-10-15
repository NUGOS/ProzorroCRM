import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CalendarEventModel {
  id: number;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  location: string;
  allDay: boolean; //TODO: незабути реалізувати додавання
}


@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:8082/api/events';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<CalendarEventModel[]> {
    return this.http.get<CalendarEventModel[]>(`${this.apiUrl}`);
  }


  createEvent(calendarEventModel: CalendarEventModel): Observable<CalendarEventModel> {
    return this.http.post<CalendarEventModel>(this.apiUrl, calendarEventModel);
  }
}
