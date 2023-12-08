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

  performers: Performer[] = [];
  currentPerformer: Performer = EmptyPerformer;

  refresh() {
    this.performersService.listPerformers(1)
      .subscribe((performers) => {
        this.performers = performers;
        this.currentPerformer = performers[0];
      });
  }

  public get nextPerformer(): Performer | null {
    let selectedIndex = this.performers.indexOf(this.currentPerformer);

    if (selectedIndex === this.performers.length - 1) {
      // Last Item
      return null;
    } else {
      return this.performers[++selectedIndex];
    }
  }
}
