import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Performer } from '../performer';

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
  constructor() {}
  
  @Input() performer: Performer | undefined;

  @Output() submit = new EventEmitter<Performer>();

  onClickSubmit() {
    this.submit.emit(this.performer);
  }
}
