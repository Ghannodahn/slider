import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformerNewPanelComponent } from './performer-edit-panel.component';

describe('PerformerPanelComponent', () => {
  let component: PerformerNewPanelComponent;
  let fixture: ComponentFixture<PerformerNewPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformerNewPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerformerNewPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
