import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'slider-session-manager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './session-manager.component.html',
  styleUrl: './session-manager.component.css'
})
export class SessionManagerComponent {
  sessions = [
    {sessionId: 1},
    {sessionId: 2}
  ];

  selectedSession = this.sessions[0];

  onClickSession(session: any) {
    this.selectedSession = session;
  }

  
}
