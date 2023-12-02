import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, catchError, map } from 'rxjs';

import { Session } from './session';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class SessionsService {
  listUrl = "data/session"

  constructor(private http: HttpClient) { }

  listSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(this.listUrl);
  }
}
