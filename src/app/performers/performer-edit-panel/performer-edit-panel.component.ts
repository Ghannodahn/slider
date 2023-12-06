import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Performer } from '../performer';

@Component({
  selector: 'slider-performer-edit-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './performer-edit-panel.component.html',
  styleUrl: './performer-edit-panel.component.css'
})
export class PerformerNewPanelComponent {
  constructor() {}
  
  @Input() performer: Performer | undefined;

  @Output() submit = new EventEmitter<Performer>();
  @Output() cancel = new EventEmitter();

  onClickSubmit() {
    this.submit.emit(this.performer);
  }

  onClickCancel() {
    this.cancel.emit();
  }
}
