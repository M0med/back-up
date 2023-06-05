import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  getPackets(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'packets/');
  }

  getEndpoints(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'endpoints/');
  }
}