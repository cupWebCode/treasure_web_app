import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResponseApp } from '../utils/response-app';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly BASE_URL = `${environment.api.url}/${environment.api.prefix}`;
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  get<T, D>(url: string, data?: D): Observable<ResponseApp<T>> {
    if (data) {
      return this.http.get<ResponseApp<T>>(
        this.buildUrl(url),
        { headers: this.setHeadersData(data) },
      );
    }
    return this.http.get<ResponseApp<T>>(this.buildUrl(url));
  }

  post<T, D>(url: string, data: D): Observable<ResponseApp<T>> {
    return this.http.post<ResponseApp<T>>(
      this.buildUrl(url),
      data,
      { headers: this.headers },
    );
  }

  private buildUrl(url: string): string {
    return `${this.BASE_URL}/${url}`;
  }

  private setHeadersData(data: {} = {}): HttpHeaders {
    let headers = this.headers;
    const keys = Object.keys(data);
    keys.map(key => (headers = headers.set(key, data[key])));

    return headers;
  }
}
