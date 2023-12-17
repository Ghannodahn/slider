import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionEditPanelComponent } from './session-edit-panel.component';

describe('PerformerPanelComponent', () => {
  let component: SessionEditPanelComponent;
  let fixture: ComponentFixture<SessionEditPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionEditPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SessionEditPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
