import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SessionManagerStateService } from '../../session-manager/session-manager-state.service';

@Component({
  selector: 'slider-performer-new-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './performer-new-panel.component.html',
  styleUrl: './performer-new-panel.component.css'
})
export class PerformerNewPanelComponent {
  constructor(
    public stateService: SessionManagerStateService
  ) {}
  
  @Output() submit = new EventEmitter();

  onClickSubmit() {
    this.submit.emit();
  }
}
