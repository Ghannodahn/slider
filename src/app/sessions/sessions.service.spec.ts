import { TestBed } from '@angular/core/testing';

import { SessionsService } from './sessions.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('SessionsService', () => {
  let service: SessionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(SessionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
