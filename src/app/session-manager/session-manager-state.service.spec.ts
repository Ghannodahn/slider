import { TestBed } from '@angular/core/testing';

import { SessionManagerStateService } from './session-manager-state.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SessionManagerStateService', () => {
  let service: SessionManagerStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(SessionManagerStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
