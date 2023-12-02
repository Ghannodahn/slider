import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Session } from '../sessions/session';
import { SessionsService } from '../sessions/sessions.service';
import { Roster } from '../rosters/roster';
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

  selectedSession = this.sessions[0];

  constructor(
    private sessionsService: SessionsService,
    private rostersService: RostersService) {}

  ngOnInit() {
    this.getSessions();
  }

  onClickSession(session: any) {
    this.selectedSession = session;
    this.getRoster();
  }

  private getSessions() {
    this.sessionsService.listSessions()
      .subscribe(sessions => this.sessions = sessions)
  }

  private getRoster() {
    this.rostersService.listRoster(this.selectedSession.sessionId)
      .subscribe(roster => this.roster = roster)
  }
}
