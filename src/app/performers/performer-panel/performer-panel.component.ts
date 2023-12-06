import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LoadingPanelEntryComponent } from '../../loading-panel-entry/loading-panel-entry.component';
import { EmptyPerformer, Performer, newPerformer } from '../performer';
import { PerformerNewPanelComponent } from '../perfomer-new-panel/performer-new-panel.component';
import { SessionManagerStateService } from '../../session-manager/session-manager-state.service';
import { PerformersService } from '../performers.service';

@Component({
  selector: 'slider-performer-panel',
  standalone: true,
  imports: [
    CommonModule,
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
    public stateService: SessionManagerStateService
  ) {}
  
  onClickPerformer(performer: Performer) {
    if (this.stateService.selectedPerformer === performer) {
      this.stateService.selectedPerformer = EmptyPerformer;
    } else {
      this.stateService.selectedPerformer = performer;
    }
  }

  onClickAddPerformer() {
    this.stateService.dirtyPerformer.sessionId = this.stateService.selectedSession.sessionId;
    this.stateService.dirtyPerformer.sessionPos = this.stateService.getNextSessionPos();
  
    this.isAdding = true;
  }

  onClickSubmitPerformer(performer: Performer) {
    this.isAdding = false;
    this.stateService.addPerformer(performer);
  }
}
