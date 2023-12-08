import { Component } from '@angular/core';
import { PerformerShowPanelComponent } from '../performers/performer-show-panel/performer-show-panel.component';
import { ShowStateService } from './show-state.service';

@Component({
  selector: 'slider-show',
  standalone: true,
  imports: [
    PerformerShowPanelComponent
  ],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css'
})
export class ShowComponent {
  constructor(
    public stateService: ShowStateService
  ) {}

  ngOnInit(): void {
    this.stateService.refresh();
  } 
}
