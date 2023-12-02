import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

import { SessionPanelComponent } from '../sessions/session-panel/session-panel.component';
import { Roster, EmptyRoster } from '../rosters/roster';
import { SessionManagerStateService } from './session-manager-state.service';
import { LoadingPanelEntryComponent } from '../loading-panel-entry/loading-panel-entry.component';

@Component({
  selector: 'slider-session-manager',
  standalone: true,
  imports: [
    CommonModule, 
    DatePipe,
    SessionPanelComponent,
    LoadingPanelEntryComponent,
  ],
  templateUrl: './session-manager.component.html',
  styleUrl: './session-manager.component.css'
})
export class SessionManagerComponent {
  constructor(
    public stateService: SessionManagerStateService) {}

  onClickRoster(performer: Roster) {
    if (this.stateService.selectedPerformer === performer) {
      this.stateService.selectedPerformer = EmptyRoster;
    } else {
      this.stateService.selectedPerformer = performer;
    }
  }

  ngOnInit() {
    this.stateService.refreshSessions();
  }
}
