import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SessionPanelComponent } from './session-panel.component';

describe('SessionPanelComponent', () => {
  let component: SessionPanelComponent;
  let fixture: ComponentFixture<SessionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SessionPanelComponent
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SessionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
