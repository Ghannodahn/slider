import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionManagerComponent } from './session-manager.component';

describe('SessionManagerComponent', () => {
  let component: SessionManagerComponent;
  let fixture: ComponentFixture<SessionManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SessionManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
