import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingPanelEntryComponent } from './loading-panel-entry.component';

describe('LoadingPanelEntryComponent', () => {
  let component: LoadingPanelEntryComponent;
  let fixture: ComponentFixture<LoadingPanelEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingPanelEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadingPanelEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
