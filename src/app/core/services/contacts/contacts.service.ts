import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api/api.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactsService extends ApiService {
  constructor(public http: HttpClient) {
    super(http);
  }

  /**
   * Get contact List
   */
  getContactList = () => this.get('contacts-mock-response/contacts');
}
