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

  constructor(private http: HttpClient) { }

  list(): Observable<Session[]> {
    var url = "data/session/list"
    return this.http.get<Session[]>(url);
  }

  get(sessionId: Number): Observable<Session> {
    var url = "data/session/get?sessionId=" + sessionId;

    return this.http.get<Session>(url);
  }

  update(session: Session): Observable<object> {
    var url = "data/session/edit"
    var options = {params: {
      sessionId: session.sessionId,
      startTime: session.startTime,
      endTime: session.endTime,
      currentPos: session.currentPos
    }};

    return this.http.put(url, options);
  }
}
