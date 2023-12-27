import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoadingPanelEntryComponent } from '../../loading-panel-entry/loading-panel-entry.component';
import { EmptyPerformer, Performer, newPerformer } from '../performer';
import { PerformerEditPanelComponent } from '../performer-edit-panel/performer-edit-panel.component';
import { SessionManagerStateService } from '../../session-manager/session-manager-state.service';

@Component({
  selector: 'slider-performer-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LoadingPanelEntryComponent,
    PerformerEditPanelComponent,
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
    if (!this.stateService.selectedSession) { return false; }
    if (!this.stateService.selectedPerformer) { return false; }

    var selectedPerformer = this.stateService.selectedPerformer;
    var performers = this.stateService.selectedSession!.performers;
    
    return (performers.indexOf(selectedPerformer) === 0);
  }

  get isLastSelected(): boolean {
    if (!this.stateService.selectedSession) { return false; }
    if (!this.stateService.selectedPerformer) { return false; }

    var selectedPerformer = this.stateService.selectedPerformer;
    var performers = this.stateService.selectedSession!.performers;
    
    return (performers.indexOf(selectedPerformer) === (performers.length - 1));
  }

  cancelEdit() {
    this.stateService.cancelEditPerformer();
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
    this.stateService.dirtyPerformer.sessionId = this.stateService.selectedSession!.sessionId;
    this.stateService.dirtyPerformer.sessionPos = this.stateService.getNextSessionPos(this.stateService.selectedSession!);
  
    this.isAdding = true;
  }

  onClickSubmitAddPerformer(performer: Performer) {
    this.isAdding = false;
    this.stateService.addPerformer(this.stateService.selectedSession!, performer);
  }

  onClickMoveUp(performer: Performer) {
    var session = this.stateService.selectedSession!;
    var currentIdx = session.performers.indexOf(performer);
    if (currentIdx == 0) {
      throw "Target performer is first in the list and cannot be moved up.";
    }

    var previousIdx = currentIdx - 1;
    var previousPerformer = session.performers[previousIdx];

    if (session.currentPos != null) {
      if (currentIdx == session.currentPos) {
        session.currentPos = previousIdx;
      } else if (session.currentPos == previousIdx) {
        session.currentPos = currentIdx;
      }
    }

    session.performers.splice(
      previousIdx, 2, performer, previousPerformer);

    this.stateService.reorderPerformers(session);
  }

  onClickMoveDown(performer: Performer) {
    var session = this.stateService.selectedSession!;
    var currentIdx = session.performers.indexOf(performer);
    if (currentIdx >= session.performers.length - 1) {
      throw "Target performer is last in the list and cannot be moved down.";
    }

    var nextIdx = currentIdx + 1;
    var nextPerformer = session.performers[nextIdx];

    if (session.currentPos != null) {
      if (session.currentPos == currentIdx) {
        session.currentPos = nextIdx;
      } else if (session.currentPos == nextIdx) {
        session.currentPos = currentIdx;
      }
    }

    session.performers.splice(
      currentIdx, 2, nextPerformer, performer);
      
    this.stateService.reorderPerformers(session);
  }

  onClickDelete(performer: Performer) {
    if (window.confirm("Are you sure you want to delete this performer?  Click OK to confirm.")) {
      this.stateService.deletePerformer(this.stateService.selectedSession!, performer);
    }
  }

  onCurrentPosChange(newPos: Number) {
    this.stateService.editSession(this.stateService.selectedSession!);
  }
}
