import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Session, EmptySession } from '../session';
import { SessionManagerStateService } from '../../session-manager/session-manager-state.service';
import { SessionsService } from '../sessions.service';

@Component({
  selector: 'slider-session-panel',
  standalone: true,
  imports: [
    CommonModule, 
    DatePipe
  ],
  templateUrl: './session-panel.component.html',
  styleUrl: './session-panel.component.css'
})
export class SessionPanelComponent {
  constructor(
    public stateService: SessionManagerStateService,
    private sessionsService: SessionsService
  ) {}

  private getSessions() {
    this.sessionsService.listSessions()
      .subscribe(sessions => this.stateService.sessions = sessions)
  }
  
  onClickSession(session: Session) {
    if (this.stateService.selectedSession === session) {
      this.stateService.selectedSession = EmptySession;
      this.stateService.Performer = [];
    } else {
      this.stateService.selectedSession = session;
      this.stateService.Performer = [];
      this.stateService.refreshPerformer();
    }
  }
}
