import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Performer, EmptyPerformer } from '../performer';

@Component({
  selector: 'slider-performer-show-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './performer-show-panel.component.html',
  styleUrl: './performer-show-panel.component.css'
})
export class PerformerShowPanelComponent {
  constructor () {}

  @Input()
  performer: Performer = EmptyPerformer;

  @Input()
  nextPerformer: Performer | null = null;

  @Input()
  showHeader: Boolean = true;

}
