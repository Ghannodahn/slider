import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, catchError, map } from 'rxjs';

import { Roster } from './roster';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class RostersService {
  constructor(private http: HttpClient) { }

  listRoster(sessionId: number): Observable<Roster[]> {
    console.log("listRoster executing");
    var listUrl = "data/roster?sessionId=" + sessionId;
    return this.http.get<Roster[]>(listUrl);
  }
}
