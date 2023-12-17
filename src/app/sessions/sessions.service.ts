import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, catchError, map } from 'rxjs';

import { Session } from './session';
import { NewId } from '../data/data';

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

  create(session: Session): Observable<NewId> {
    var url = "data/session/create";

    var options = { params: session };

    return this.http.put<NewId>(url, options);
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
  
  delete(session: Session): Observable<object> {
    var url = "data/session/delete";

    var options = { params: session };

    return this.http.put(url, options);
  }
}
