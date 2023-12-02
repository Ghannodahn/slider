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
  Performer: Performer[] = [];
  isPerformerLoading: boolean = false;

  selectedSession: Session = EmptySession;
  selectedPerformer: Performer = EmptyPerformer;

  constructor(
    private sessionsService: SessionsService,
    private PerformersService: PerformersService
  ) {}
  
  public refreshSessions() {
    this.sessionsService.listSessions()
      .subscribe(sessions => this.sessions = sessions)
  }
  
  public refreshPerformer() {
    if (!this.selectedSession) { return; }

    this.isPerformerLoading = true;

    this.PerformersService.listPerformer(this.selectedSession.sessionId)
      .subscribe(Performer => {    
        this.isPerformerLoading = false;
        this.Performer = Performer;
      });
  }
}
