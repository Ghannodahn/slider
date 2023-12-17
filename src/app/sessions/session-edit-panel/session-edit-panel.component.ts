import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Session } from '../session';

@Component({
  selector: 'slider-session-edit-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './session-edit-panel.component.html',
  styleUrl: './session-edit-panel.component.css'
})
export class SessionEditPanelComponent {
  constructor() {}
  
  @Input() session: Session | undefined;

  @Output() submit = new EventEmitter<Session>();
  @Output() cancel = new EventEmitter();

  onClickSubmit() {
    this.submit.emit(this.session);
  }

  onClickCancel() {
    this.cancel.emit();
  }
}
