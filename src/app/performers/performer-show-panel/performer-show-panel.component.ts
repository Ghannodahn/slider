import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Performer, EmptyPerformer } from '../performer';
import { ShowStyleToolbarComponent } from '../../show/show-style-toolbar/show-style-toolbar.component'
import { EmptyShowStyle, ShowStyle, newShowStyle } from '../../show/show-style';
import { PerformersService } from '../performers.service';

@Component({
  selector: 'slider-performer-show-panel',
  standalone: true,
  imports: [
    CommonModule,
    ShowStyleToolbarComponent
  ],
  templateUrl: './performer-show-panel.component.html',
  styleUrl: './performer-show-panel.component.css'
})
export class PerformerShowPanelComponent {
  constructor (
    private performersService: PerformersService
  ) {}

  get currentStyle(): ShowStyle {
    return this.performer.customStyle || EmptyShowStyle;
  }

  @Input()
  performer: Performer = EmptyPerformer;

  @Input()
  nextPerformer: Performer | null = null;

  @Input()
  showHeader: Boolean = true;

  onStyleChange() {
    this.performersService.restylePerformer(this.performer)
      .subscribe(() => {});
  }

  customizeStyle() {
    this.performer.customStyle = newShowStyle();
  }
}
