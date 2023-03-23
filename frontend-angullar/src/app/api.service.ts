import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  colorPrimary: string;
  colorSecondary: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiBaseUrl = 'http://localhost:8082';

  constructor(private httpClient: HttpClient) {}

  getTestData() {
    const apiUrl = `${this.apiBaseUrl}/main/test`;
    return this.httpClient.get(apiUrl);
  }

  getEvents(): Observable<CalendarEvent[]> {
    const apiUrl = `${this.apiBaseUrl}/calendar`;
    return this.httpClient.get<CalendarEvent[]>(apiUrl);
  }
}
