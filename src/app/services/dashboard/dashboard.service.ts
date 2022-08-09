import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  url = environment.apiURL;

  constructor(private httpClient: HttpClient) {}

  getDetails() {
    return this.httpClient.get(`${this.url}/dashboard/details`);
  }
}
