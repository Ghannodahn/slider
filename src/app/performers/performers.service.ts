import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Performer } from './performer';

@Injectable({
  providedIn: 'root'
})
export class PerformersService {
  constructor(private http: HttpClient) { }

  listPerformers(sessionId: number): Observable<Performer[]> {
    var listUrl = "data/performer/list?sessionId=" + sessionId;
    return this.http.get<Performer[]>(listUrl);
  }

  addPerformer(performer: Performer): Observable<object> {
    var createUrl = "data/performer/create";

    var options = { params: performer };

    return this.http.put(createUrl, options);
  }

  editPerformer(performer: Performer): Observable<object> {
    var createUrl = "data/performer/edit";

    var options = { params: performer };

    return this.http.put(createUrl, options);
  }
}
