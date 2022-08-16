import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  url = environment.apiURL;

  constructor(private httpClient: HttpClient) {}

  generateReport(data: any) {
    return this.httpClient.post(`${this.url}/bill/generate-report`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  getPDF(data: any): Observable<Blob> {
    return this.httpClient.post(`${this.url}/bill/get-pdf`, data, {
      responseType: 'blob',
    });
  }

  getBills() {
    return this.httpClient.get(`${this.url}/bill/get-bills`);
  }

  delete(id: any) {
    return this.httpClient.delete(`${this.url}/bill/delete/${id}`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
