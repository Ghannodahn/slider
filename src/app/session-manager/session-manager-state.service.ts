import { Injectable } from '@angular/core';
import { Session, EmptySession } from '../sessions/session';
import { Performer, EmptyPerformer } from '../performers/performer'
import { SessionsService } from '../sessions/sessions.service';
import { PerformersService } from '../performers/performers.service';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerStateService {
  sessions: Session[] = [];
  selectedSession: Session = EmptySession;
  isSessionLoading: boolean = false;

  Performer: Performer[] = [];
  selectedPerformer: Performer = EmptyPerformer;
  isPerformerLoading: boolean = false;

  constructor(
    private sessionsService: SessionsService,
    private performersService: PerformersService
  ) {}
  
  public refreshSessions() {
    this.isSessionLoading = true;

    this.sessionsService.listSessions()
      .subscribe(sessions => {
        this.isSessionLoading = false;
        this.sessions = sessions;
      });
  }
  
  public refreshPerformer() {
    if (!this.selectedSession) { return; }

    this.isPerformerLoading = true;

    this.performersService.listPerformer(this.selectedSession.sessionId)
      .subscribe(performer => {    
        this.isPerformerLoading = false;
        this.Performer = performer;
      });
  }
}
