import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LoadingPanelEntryComponent } from '../../loading-panel-entry/loading-panel-entry.component';
import { Performer, EmptyPerformer } from '../performer';
import { SessionManagerStateService } from '../../session-manager/session-manager-state.service';
import { PerformersService } from '../performers.service';

@Component({
  selector: 'slider-performer-panel',
  standalone: true,
  imports: [
    CommonModule, 
    DatePipe,
    LoadingPanelEntryComponent
  ],
  templateUrl: './performer-panel.component.html',
  styleUrl: './performer-panel.component.css'
})
export class PerformerPanelComponent {
  constructor(
    public stateService: SessionManagerStateService,
    private performersService: PerformersService
  ) {}
  
  onClickPerformer(performer: Performer) {
    if (this.stateService.selectedPerformer === performer) {
      this.stateService.selectedPerformer = EmptyPerformer;
    } else {
      this.stateService.selectedPerformer = performer;
    }
  }
}
