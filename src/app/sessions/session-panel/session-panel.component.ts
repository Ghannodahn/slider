import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LoadingPanelEntryComponent } from '../../loading-panel-entry/loading-panel-entry.component';
import { Session, EmptySession, newSession } from '../session';
import { SessionManagerStateService } from '../../session-manager/session-manager-state.service';
import { SessionsService } from '../sessions.service';
import { SessionEditPanelComponent } from '../session-edit-panel/session-edit-panel.component';

@Component({
  selector: 'slider-session-panel',
  standalone: true,
  imports: [
    CommonModule, 
    DatePipe,
    LoadingPanelEntryComponent,
    SessionEditPanelComponent
  ],
  templateUrl: './session-panel.component.html',
  styleUrl: './session-panel.component.css'
})
export class SessionPanelComponent {
  isAdding: boolean = false;
  isEditing: boolean = false;
  sessionSnapshot?: Session;

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
    } else {
      this.stateService.selectedSession = session;
    }
  }

  onClickAddSession() {
    this.isAdding = true;
  }

  onClickSubmitAddSession(session: Session) {
    this.stateService.addSession(session);
    this.isAdding = false;
  }

  onClickCancelAddSession() {
    this.isAdding = false;
    this.stateService.dirtySession = newSession();
  }

  onClickSubmitEditSession(session: Session) {
    this.stateService.editSession(session);
    this.isEditing = false;
  }

  onClickCancelEditSession() {
    this.isEditing = false;
    this.stateService.selectedSession!.startTime = this.sessionSnapshot!.startTime;
    this.stateService.selectedSession!.endTime = this.sessionSnapshot!.endTime;
    this.stateService.selectedSession!.currentPos = this.sessionSnapshot!.currentPos;
  }

  onClickEditSession(session: Session) {
    this.sessionSnapshot = structuredClone(session);
    this.isEditing = true;
  }
    
  onClickDeleteSession(session: Session) {
    if (window.confirm("Are you sure you want to delete this session?  Click OK to confirm.")) {
      this.stateService.deleteSession(session);
    }
  }
}
