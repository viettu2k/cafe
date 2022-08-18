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

  forgotPassword(data: any) {
    return this.httpClient.post(`${this.url}/user/forgot-password`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  login(data: any) {
    return this.httpClient.post(`${this.url}/user/login`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  checkToken() {
    return this.httpClient.get(`${this.url}/user/check-token`);
  }

  changePassword(data: any) {
    return this.httpClient.post(`${this.url}/user/change-password`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  getUsers() {
    return this.httpClient.get(`${this.url}/user/get`);
  }

  update(data: any) {
    return this.httpClient.patch(`${this.url}/user/active-account`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
