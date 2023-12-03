import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, catchError, map } from 'rxjs';

import { Performer } from './performer';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class PerformersService {
  constructor(private http: HttpClient) { }

  listPerformers(sessionId: number): Observable<Performer[]> {
    console.log("listPerformers executing");
    var listUrl = "data/performer?sessionId=" + sessionId;
    return this.http.get<Performer[]>(listUrl);
  }
}
