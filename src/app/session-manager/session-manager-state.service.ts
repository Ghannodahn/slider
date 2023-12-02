import { Injectable } from '@angular/core';
import { Session, EmptySession } from '../sessions/session';
import { Roster, EmptyRoster } from '../rosters/roster'
import { SessionsService } from '../sessions/sessions.service';
import { RostersService } from '../rosters/rosters.service';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerStateService {
  sessions: Session[] = [];
  roster: Roster[] = [];
  isRosterLoading: boolean = false;

  selectedSession: Session = EmptySession;
  selectedPerformer: Roster = EmptyRoster;

  constructor(
    private sessionsService: SessionsService,
    private rostersService: RostersService
  ) {}
  
  public refreshSessions() {
    this.sessionsService.listSessions()
      .subscribe(sessions => this.sessions = sessions)
  }
  
  public refreshRoster() {
    if (!this.selectedSession) { return; }

    this.isRosterLoading = true;

    this.rostersService.listRoster(this.selectedSession.sessionId)
      .subscribe(roster => {    
        this.isRosterLoading = false;
        this.roster = roster;
      });
  }
}
