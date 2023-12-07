import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Performer } from './performer';

export interface PerformerReorderRequest {
  id: Number,
  pos: Number
}

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
    var url = "data/performer/create";

    var options = { params: performer };

    return this.http.put(url, options);
  }

  editPerformer(performer: Performer): Observable<object> {
    var url = "data/performer/edit";

    var options = { params: performer };

    return this.http.put(url, options);
  }

  reorderPerformers(performers: Performer[]): Observable<object> {
    var url = "data/performer/reorder";
    var newOrder: PerformerReorderRequest[] = [];
    
    performers.forEach((performer) => {
      newOrder.push({
        "id": performer.performerId, 
        "pos": performer.sessionPos});
    })
    var options = { params: newOrder }

    return this.http.put(url, options);
  }

  deletePerformer(performer: Performer): Observable<object> {
    var url = "data/performer/delete";

    var options = { params: {performerId: performer.performerId }};

    return this.http.put(url, options);
  }
}
