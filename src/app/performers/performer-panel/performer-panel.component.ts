import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LoadingPanelEntryComponent } from '../../loading-panel-entry/loading-panel-entry.component';
import { EmptyPerformer, Performer } from '../performer';
import { PerformerNewPanelComponent } from '../performer-edit-panel/performer-edit-panel.component';
import { SessionManagerStateService } from '../../session-manager/session-manager-state.service';

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
  isAdding: Boolean = false;
  isEditing: Boolean = false;

  constructor(
    public stateService: SessionManagerStateService
  ) {}
  
  onClickPerformer(performer: Performer) {
    if (this.isEditing) {
      this.stateService.selectedPerformer.displayName = this.stateService.performerSnapshot.displayName;
      this.stateService.selectedPerformer.sessionPos = this.stateService.performerSnapshot.sessionPos;
      this.stateService.selectedPerformer.link = this.stateService.performerSnapshot.link;
      this.stateService.selectedPerformer.socialIg = this.stateService.performerSnapshot.socialIg;

      this.isEditing = false;
    }

    if (this.stateService.selectedPerformer === performer) {
      this.stateService.selectedPerformer = EmptyPerformer;
    } else {
      this.stateService.selectedPerformer = performer;
    }
  }

  onClickEditPerformer(performer: Performer) {
    this.isEditing = true;
    this.stateService.performerSnapshot = structuredClone(performer);
  }

  onClickSubmitEditPerformer(performer: Performer) {
    this.isEditing = false;
    this.stateService.editPerformer(performer);
  }

  onClickAddPerformer() {
    this.stateService.dirtyPerformer.sessionId = this.stateService.selectedSession.sessionId;
    this.stateService.dirtyPerformer.sessionPos = this.stateService.getNextSessionPos();
  
    this.isAdding = true;
  }

  onClickSubmitAddPerformer(performer: Performer) {
    this.isAdding = false;
    this.stateService.addPerformer(performer);
  }
}
