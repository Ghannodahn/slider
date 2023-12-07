import { Injectable } from '@angular/core';
import { Session, EmptySession } from '../sessions/session';
import { Performer, EmptyPerformer, newPerformer } from '../performers/performer'
import { SessionsService } from '../sessions/sessions.service';
import { PerformersService } from '../performers/performers.service';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerStateService {
  sessions: Session[] = [];
  selectedSession: Session = EmptySession;
  isSessionLoading: boolean = false;

  performers: Performer[] = [];
  dirtyPerformer: Performer = newPerformer();
  selectedPerformer: Performer = EmptyPerformer;
  isPerformerLoading: boolean = false;

  performerSnapshot: Performer = EmptyPerformer;

  constructor(
    private sessionsService: SessionsService,
    private performersService: PerformersService
  ) {}
  
  public refreshSessions() {
    this.isSessionLoading = true;

    this.sessionsService.listSessions()
      .subscribe(sessions => {
        this.isSessionLoading = false;
        this.sessions = sessions;
      });
  }
  
  public get isSessionSelected() : boolean {
    return (this.selectedSession !== EmptySession);
  }

  public get isPerformerSelected() : boolean {
    return (this.selectedPerformer !== EmptyPerformer);
  }

  public cancelEdit() {
    this.selectedPerformer.displayName = this.performerSnapshot.displayName;
    this.selectedPerformer.sessionPos = this.performerSnapshot.sessionPos;
    this.selectedPerformer.link = this.performerSnapshot.link;
    this.selectedPerformer.socialIg = this.performerSnapshot.socialIg;
  }
  public getNextSessionPos() : number {
    var lastPos = -1;

    this.performers.forEach(function(performer) {
      if (performer.sessionPos > lastPos) {
        lastPos = performer.sessionPos;
      }
    });

    return ++lastPos;
  }

  public refreshPerformers() {
    if (!this.selectedSession) { return; }

    this.isPerformerLoading = true;

    this.performersService.listPerformers(this.selectedSession.sessionId)
      .subscribe(performer => {    
        this.isPerformerLoading = false;
        this.performers = performer;
      });
  }

  public addPerformer(performer: Performer) {
    this.isPerformerLoading = true;
    this.performers = [];
    this.dirtyPerformer = newPerformer();

    this.performersService.addPerformer(performer)
      .subscribe(() => {
        this.refreshPerformers();
      });
  }

  public editPerformer(performer: Performer) {
    this.performersService.editPerformer(performer)
      .subscribe(() => { });
  }

  public reorderPerformers() {
    for (var i = 0; i < this.performers.length; ++i) {
      this.performers[i].sessionPos = i;
    }

    this.performersService.reorderPerformers(this.performers)
      .subscribe(() => { });
  }

  public deletePerformer(performer: Performer) {
    let selectedIndex = this.performers.indexOf(performer);
    this.selectedPerformer = this.nextPerformer || this.performers[this.performers.length - 2];
    this.performers.splice(selectedIndex, 1);
    
    this.performersService.deletePerformer(performer)
      .subscribe(() => { });
  }

  public get nextPerformer(): Performer | null {
    if (this.isPerformerSelected) {
      let selectedIndex = this.performers.indexOf(this.selectedPerformer);

      if (selectedIndex === this.performers.length - 1) {
        // Last Item
        return null;
      } else {
        return this.performers[++selectedIndex];
      }
    } else {
      // No selection
      return null;
    }
  }
}
