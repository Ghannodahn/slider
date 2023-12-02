import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { Session } from '../sessions/session';
import { SessionsService } from '../sessions/sessions.service';

@Component({
  selector: 'slider-session-manager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './session-manager.component.html',
  styleUrl: './session-manager.component.css'
})
export class SessionManagerComponent {
  sessions: Session[] = [];

  selectedSession = this.sessions[0];

  constructor(private sessionsService: SessionsService) {}

  ngOnInit() {
    this.getSessions();
  }

  onClickSession(session: any) {
    this.selectedSession = session;
  }

  private getSessions() {
    this.sessionsService.listSessions()
      .subscribe(sessions => this.sessions = sessions)
  }
}
