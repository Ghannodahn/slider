import { Injectable } from '@angular/core';
import { Session, EmptySession } from '../sessions/session';
import { Performer, EmptyPerformer, newPerformer } from '../performers/performer'
import { SessionsService } from '../sessions/sessions.service';
import { PerformersService } from '../performers/performers.service';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerStateService {
  sessions: Session[] = [];
  selectedSession: Session = EmptySession;
  isSessionLoading: boolean = false;

  performers: Performer[] = [];
  dirtyPerformer: Performer = newPerformer();
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
  
  public isSessionSelected() : boolean {
    return (this.selectedSession !== EmptySession);
  }

  public isPerformerSelected() : boolean {
    return (this.selectedPerformer !== EmptyPerformer);
  }

  public getNextSessionPos() : number {
    var lastPos = -1;

    this.performers.forEach(function(performer) {
      if (performer.sessionPos > lastPos) {
        lastPos = performer.sessionPos;
      }
    });

    return ++lastPos;
  }

  public refreshPerformers() {
    if (!this.selectedSession) { return; }

    this.isPerformerLoading = true;

    this.performersService.listPerformers(this.selectedSession.sessionId)
      .subscribe(performer => {    
        this.isPerformerLoading = false;
        this.performers = performer;
      });
  }

  public addPerformer() {
    this.isPerformerLoading = true;

    this.performersService.addPerformer(this.dirtyPerformer)
      .subscribe(() => {
        this.dirtyPerformer = newPerformer();
        this.refreshPerformers();
      });
  }
}
