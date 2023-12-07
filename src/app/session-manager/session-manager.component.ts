import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

import { SessionPanelComponent } from '../sessions/session-panel/session-panel.component';
import { PerformerPanelComponent } from '../performers/performer-panel/performer-panel.component';
import { PerformerShowPanelComponent } from '../performers/performer-show-panel/performer-show-panel.component';
import { SessionManagerStateService } from './session-manager-state.service';
import { AppHeaderComponent } from '../app-header/app-header.component';

@Component({
  selector: 'slider-session-manager',
  standalone: true,
  imports: [
    CommonModule, 
    DatePipe,
    SessionPanelComponent,
    PerformerPanelComponent,
    PerformerShowPanelComponent,
    AppHeaderComponent,
  ],
  templateUrl: './session-manager.component.html',
  styleUrl: './session-manager.component.css'
})
export class SessionManagerComponent {
  constructor(
    public stateService: SessionManagerStateService) {}

  ngOnInit() {
    this.stateService.refreshSessions();
  }
}
