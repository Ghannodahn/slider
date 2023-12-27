import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformerEditPanelComponent } from './performer-edit-panel.component';

describe('PerformerEditPanelComponent', () => {
  let component: PerformerEditPanelComponent;
  let fixture: ComponentFixture<PerformerEditPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformerEditPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerformerEditPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
