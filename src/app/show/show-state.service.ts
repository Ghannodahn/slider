import { Injectable } from '@angular/core';
import { PerformersService } from '../performers/performers.service';
import { Performer, EmptyPerformer } from '../performers/performer';
import { SessionsService } from '../sessions/sessions.service';
import { EmptySession, Session } from '../sessions/session';

@Injectable({
  providedIn: 'root'
})
export class ShowStateService {
  constructor(
    private performersService: PerformersService,
    private sessionsService: SessionsService
  ) { }

  sessionId?: number;
  currentSession: Session = EmptySession;
  currentPerformer: Performer = EmptyPerformer;
  performers: Performer[] = [];

  refresh(autoRefreshSec?: number) {
    if (this.sessionId) {
      this.sessionsService.get(this.sessionId)
        .subscribe((session) => {
          this.currentSession = session;

          this.performersService.listPerformers(session.sessionId)
            .subscribe((performers) => {
              this.performers = performers;

              if (session.currentPos != null) {
                this.currentPerformer = this.performers[session.currentPos];
              } else {
                this.currentPerformer = EmptyPerformer;
              }

              if (autoRefreshSec) {
                setInterval((() => { 
                  this.refresh(autoRefreshSec); }), autoRefreshSec);
              }
            });
        });
    }
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
