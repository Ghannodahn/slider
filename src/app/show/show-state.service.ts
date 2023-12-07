import { Injectable } from '@angular/core';
import { PerformersService } from '../performers/performers.service';
import { Performer, EmptyPerformer } from '../performers/performer';

@Injectable({
  providedIn: 'root'
})
export class ShowStateService {
  constructor(
    private performersService: PerformersService
  ) { }

  currentPerformer: Performer = EmptyPerformer;

  refresh() {
    this.performersService.getPerformer(1)
      .subscribe((performer) => {
        this.currentPerformer = performer;
      });
  }
}
