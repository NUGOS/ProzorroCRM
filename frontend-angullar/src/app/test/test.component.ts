import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  responseData: string | undefined;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void { }

  fetchData(): void {
    this.apiService.getTestData().subscribe(data => {
      this.responseData = JSON.stringify(data);
    });
  }
}
