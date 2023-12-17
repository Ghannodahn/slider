import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoadingPanelEntryComponent } from '../../loading-panel-entry/loading-panel-entry.component';
import { EmptyPerformer, Performer, newPerformer } from '../performer';
import { PerformerNewPanelComponent } from '../performer-edit-panel/performer-edit-panel.component';
import { SessionManagerStateService } from '../../session-manager/session-manager-state.service';

@Component({
  selector: 'slider-performer-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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

  get isFirstSelected(): boolean {
    var selectedPerformer = this.stateService.selectedPerformer;
    var performers = this.stateService.selectedSession.performers;

    if (!selectedPerformer) { return false; }
    
    return (performers.indexOf(selectedPerformer) === 0);
  }

  get isLastSelected(): boolean {
    var selectedPerformer = this.stateService.selectedPerformer;
    var performers = this.stateService.selectedSession.performers;

    if (!selectedPerformer) { return false; }
    
    return (performers.indexOf(selectedPerformer) === (performers.length - 1));
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
    this.stateService.dirtyPerformer.sessionPos = this.stateService.getNextSessionPos(this.stateService.selectedSession);
  
    this.isAdding = true;
  }

  onClickSubmitAddPerformer(performer: Performer) {
    this.isAdding = false;
    this.stateService.addPerformer(this.stateService.selectedSession, performer);
  }

  onClickMoveUp(performer: Performer) {
    var currentIdx = this.stateService.selectedSession.performers.indexOf(performer);
    if (currentIdx == 0) {
      throw "Target performer is first in the list and cannot be moved up.";
    }

    var previousIdx = currentIdx - 1;
    var previousPerformer = this.stateService.selectedSession.performers[previousIdx];
    this.stateService.selectedSession.performers.splice(
      previousIdx, 2, performer, previousPerformer);

    this.stateService.reorderPerformers(this.stateService.selectedSession);
  }

  onClickMoveDown(performer: Performer) {
    var currentIdx = this.stateService.selectedSession.performers.indexOf(performer);
    if (currentIdx >= this.stateService.selectedSession.performers.length - 1) {
      throw "Target performer is last in the list and cannot be moved down.";
    }

    var nextIdx = currentIdx + 1;
    var nextPerformer = this.stateService.selectedSession.performers[nextIdx];
    this.stateService.selectedSession.performers.splice(
      currentIdx, 2, nextPerformer, performer);
      
    this.stateService.reorderPerformers(this.stateService.selectedSession);
  }

  onClickDelete(performer: Performer) {
    if (window.confirm("Are you sure you want to delete this performer?  Click OK to confirm.")) {
      this.stateService.deletePerformer(this.stateService.selectedSession, performer);
    }
  }

  onCurrentPosChange(newPos: Number) {
    this.stateService.updateSession(this.stateService.selectedSession);
  }
}
