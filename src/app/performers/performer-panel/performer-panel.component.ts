import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LoadingPanelEntryComponent } from '../../loading-panel-entry/loading-panel-entry.component';
import { Performer, newPerformer } from '../performer';
import { PerformerNewPanelComponent } from '../perfomer-new-panel/performer-new-panel.component';
import { SessionManagerStateService } from '../../session-manager/session-manager-state.service';
import { PerformersService } from '../performers.service';

@Component({
  selector: 'slider-performer-panel',
  standalone: true,
  imports: [
    CommonModule, 
    DatePipe,
    LoadingPanelEntryComponent,
    PerformerNewPanelComponent,
  ],
  templateUrl: './performer-panel.component.html',
  styleUrl: './performer-panel.component.css'
})
export class PerformerPanelComponent {
  @Input()
  isAdding:Boolean = false;

  constructor(
    public stateService: SessionManagerStateService,
    private performersService: PerformersService
  ) {}
  
  onClickPerformer(performer: Performer) {
    if (this.stateService.selectedPerformer === performer) {
      this.stateService.selectedPerformer = newPerformer();
    } else {
      this.stateService.selectedPerformer = performer;
    }
  }

  onClickAddPerformer() {
    this.stateService.dirtyPerformer.sessionId = this.stateService.selectedSession.sessionId;
    this.stateService.dirtyPerformer.sessionPos = this.stateService.getNextSessionPos();
  
    this.isAdding = true;
  }

  onClickSubmitPerformer() {
    this.isAdding = false;
    this.stateService.addPerformer();
  }
}
