import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LoadingPanelEntryComponent } from '../../loading-panel-entry/loading-panel-entry.component';
import { EmptyPerformer, Performer, newPerformer } from '../performer';
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
  
  onClickCancelEditPerformer() {
    this.cancelEdit();
  }

  cancelEdit() {
    this.stateService.cancelEdit();
    this.isEditing = false;
  }

  onClickPerformer(performer: Performer) {
    if (this.isEditing) {
      this.cancelEdit();
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

  onClickCancelAddPerformer() {
    this.stateService.dirtyPerformer = newPerformer();
    this.isAdding = false;
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
