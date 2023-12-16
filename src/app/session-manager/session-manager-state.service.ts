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

  dirtyPerformer: Performer = newPerformer();
  selectedPerformer: Performer = EmptyPerformer;
  isPerformerLoading: boolean = false;

  performerSnapshot: Performer = EmptyPerformer;

  constructor(
    private sessionsService: SessionsService,
    private performersService: PerformersService
  ) {}
  
  public refreshSessions() {
    this.isSessionLoading = true;

    this.sessionsService.list()
      .subscribe(sessions => {
        this.isSessionLoading = false;
        this.sessions = sessions;
      });
  }
  
  public refreshSession(session: Session) {
    this.sessionsService.get(session.sessionId)
      .subscribe(updatedSession => {
        this.sessions[this.sessions.indexOf(session)] = updatedSession;
        
        if (updatedSession.sessionId === this.selectedSession.sessionId) {
          this.selectedSession = updatedSession;
        }

        this.isPerformerLoading = false;
      });

  }
  public get isSessionSelected() : boolean {
    return (this.selectedSession !== EmptySession);
  }

  public get isPerformerSelected() : boolean {
    return (this.selectedPerformer !== EmptyPerformer);
  }

  public cancelEdit() {
    this.selectedPerformer.displayName = this.performerSnapshot.displayName;
    this.selectedPerformer.sessionPos = this.performerSnapshot.sessionPos;
    this.selectedPerformer.link = this.performerSnapshot.link;
    this.selectedPerformer.socialIg = this.performerSnapshot.socialIg;
  }

  public getNextSessionPos(session: Session) : number {
    var lastPos = -1;

    session.performers.forEach(function(performer) {
      if (performer.sessionPos > lastPos) {
        lastPos = performer.sessionPos;
      }
    });

    return ++lastPos;
  }

  public addPerformer(session: Session, performer: Performer) {
    this.isPerformerLoading = true;
    this.dirtyPerformer = newPerformer();

    this.performersService.addPerformer(performer)
      .subscribe(() => {
        this.refreshSession(session);
      });
  }

  public editPerformer(performer: Performer) {
    this.performersService.editPerformer(performer)
      .subscribe(() => { });
  }

  public reorderPerformers(session: Session) {
    for (var i = 0; i < session.performers.length; ++i) {
      session.performers[i].sessionPos = i;
    }

    session.currentPos = session.performers.indexOf(
      this.selectedPerformer);

    this.sessionsService.update(session)
      .subscribe(() => { });

    this.performersService.reorderPerformers(session.performers)
      .subscribe(() => { });
  }

  public deletePerformer(session: Session, performer: Performer) {
    let selectedIndex = session.performers.indexOf(performer);
    this.selectedPerformer = 
      this.getNextPerformer(session) || 
      session.performers[session.performers.length - 2];
    session.performers.splice(selectedIndex, 1);
    
    this.performersService.deletePerformer(performer)
      .subscribe(() => { });
  }

  public getNextPerformer(session: Session): Performer | null {
    if (this.isPerformerSelected) {
      let selectedIndex = session.performers.indexOf(this.selectedPerformer);

      if (selectedIndex === session.performers.length - 1) {
        // Last Item
        return null;
      } else {
        return session.performers[++selectedIndex];
      }
    } else {
      // No selection
      return null;
    }
  }

  public updateSession(session: Session) {
    this.sessionsService.update(session)
      .subscribe(() => { });
  }
}
