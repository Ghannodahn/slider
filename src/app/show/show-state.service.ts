import { Injectable } from '@angular/core';
import { Performer, EmptyPerformer } from '../performers/performer';
import { SessionsService } from '../sessions/sessions.service';
import { EmptySession, Session } from '../sessions/session';

@Injectable({
  providedIn: 'root'
})
export class ShowStateService {
  constructor(
    private sessionsService: SessionsService
  ) { }

  currentSession: Session = EmptySession;
  currentPerformer: Performer = EmptyPerformer;
  autoRefreshMs: number = 5000;

  public get performers(): Performer[] {
    return this.currentSession.performers;
  }

  refresh(sessionId: Number) {
    this.sessionsService.get(sessionId)
      .subscribe(session => {
        this.currentSession = session;

        if (session.currentPos != null) {
          this.currentPerformer = this.performers[session.currentPos];
        }

        setTimeout(() => { this.refresh(sessionId); }, this.autoRefreshMs);
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
