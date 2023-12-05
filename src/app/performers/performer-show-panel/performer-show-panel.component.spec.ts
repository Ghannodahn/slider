import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformerShowPanelComponent } from './performer-show-panel.component';

describe('PerformerShowPanelComponent', () => {
  let component: PerformerShowPanelComponent;
  let fixture: ComponentFixture<PerformerShowPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformerShowPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerformerShowPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
