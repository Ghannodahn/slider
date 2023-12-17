import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStyleToolbarComponent } from './show-style-toolbar.component';

describe('ShowStyleToolbarComponent', () => {
  let component: ShowStyleToolbarComponent;
  let fixture: ComponentFixture<ShowStyleToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowStyleToolbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowStyleToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
