import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
