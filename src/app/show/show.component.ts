import { Component } from '@angular/core';
import { PerformerShowPanelComponent } from '../performers/performer-show-panel/performer-show-panel.component';
import { ShowStateService } from './show-state.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

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
    public stateService: ShowStateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((params) => {
        var sessionId = Number(params.get('sessionId'));
        this.stateService.refresh(sessionId);
      });
  } 
}
