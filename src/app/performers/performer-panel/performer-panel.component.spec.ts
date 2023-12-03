import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformerPanelComponent } from './performer-panel.component';

describe('PerformerPanelComponent', () => {
  let component: PerformerPanelComponent;
  let fixture: ComponentFixture<PerformerPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformerPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerformerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
