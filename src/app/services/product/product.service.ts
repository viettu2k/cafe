import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = environment.apiURL;

  constructor(private httpClient: HttpClient) {}

  add(data: any) {
    return this.httpClient.post(`${this.url}/product/add`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  edit(data: any) {
    return this.httpClient.patch(`${this.url}/product/update`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  updateStatus(data: any) {
    return this.httpClient.patch(`${this.url}/product/update-status`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  getProducts() {
    return this.httpClient.get(`${this.url}/product/get`);
  }

  delete(id: any) {
    return this.httpClient.delete(`${this.url}/product/delete/${id}`);
  }

  getProductsByCategory(id: any) {
    return this.httpClient.get(`${this.url}/product/getByCategory/${id}`);
  }

  getById(id: any) {
    return this.httpClient.get(`${this.url}/product/getById/${id}`);
  }
}
