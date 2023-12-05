import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SessionManagerStateService } from '../../session-manager/session-manager-state.service';

@Component({
  selector: 'slider-performer-show-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './performer-show-panel.component.html',
  styleUrl: './performer-show-panel.component.css'
})
export class PerformerShowPanelComponent {
  constructor (
    public stateService: SessionManagerStateService
  ) {}
}
