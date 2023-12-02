import { TestBed } from '@angular/core/testing';

import { SessionManagerStateService } from './session-manager-state.service';

describe('SessionManagerStateService', () => {
  let service: SessionManagerStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionManagerStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
