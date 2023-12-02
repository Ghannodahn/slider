import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Session, EmptySession } from '../sessions/session';
import { SessionsService } from '../sessions/sessions.service';
import { Roster, EmptyRoster } from '../rosters/roster';
import { RostersService } from '../rosters/rosters.service';

@Component({
  selector: 'slider-session-manager',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './session-manager.component.html',
  styleUrl: './session-manager.component.css'
})
export class SessionManagerComponent {
  sessions: Session[] = [];
  roster: Roster[] = [];
  isRosterLoading: boolean = false;

  selectedSession: Session = EmptySession;
  selectedPerformer: Roster = EmptyRoster;

  constructor(
    private sessionsService: SessionsService,
    private rostersService: RostersService) {}

  ngOnInit() {
    this.getSessions();
  }

  onClickSession(session: Session) {
    if (this.selectedSession === session) {
      this.selectedSession = EmptySession;
      this.roster = [];
    } else {
      this.selectedSession = session;
      this.roster = [];
      this.getRoster();
    }
  }

  onClickRoster(performer: Roster) {
    if (this.selectedPerformer === performer) {
      this.selectedPerformer = EmptyRoster;
    } else {
      this.selectedPerformer = performer;
    }
  }

  private getSessions() {
    this.sessionsService.listSessions()
      .subscribe(sessions => this.sessions = sessions)
  }

  private getRoster() {
    if (!this.selectedSession) { return; }

    this.isRosterLoading = true;

    this.rostersService.listRoster(this.selectedSession.sessionId)
      .subscribe(roster => {    
        this.isRosterLoading = false;
        this.roster = roster;
      });
  }
}
