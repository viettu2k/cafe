import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.apiURL;

  constructor(private httpClient: HttpClient) {}

  register(data: any) {
    return this.httpClient.post(`${this.url}/user/register`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
