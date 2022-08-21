import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public httpService: HttpClient) {}
  /**
   * Get Api Url
   * @param url includes url
   * @returns formatted url
   */
  apiUrl = (url: string): string => environment.endpoint + url;

  /**
   * Http Get
   * @param url includes url
   */
  get = (url: string): Observable<any> =>
    this.httpService.get<any>(this.apiUrl(url));
}
