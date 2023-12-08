import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LoadingPanelEntryComponent } from '../../loading-panel-entry/loading-panel-entry.component';
import { Session, EmptySession } from '../session';
import { SessionManagerStateService } from '../../session-manager/session-manager-state.service';
import { SessionsService } from '../sessions.service';

@Component({
  selector: 'slider-session-panel',
  standalone: true,
  imports: [
    CommonModule, 
    DatePipe,
    LoadingPanelEntryComponent
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
    this.sessionsService.list()
      .subscribe(sessions => this.stateService.sessions = sessions)
  }
  
  onClickSession(session: Session) {
    if (this.stateService.selectedSession === session) {
      this.stateService.selectedSession = EmptySession;
      this.stateService.performers = [];
    } else {
      this.stateService.selectedSession = session;
      this.stateService.performers = [];
      this.stateService.refreshPerformers();
    }
  }
}
