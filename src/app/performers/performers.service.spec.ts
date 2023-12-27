import { TestBed } from '@angular/core/testing';

import { PerformersService } from './performers.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PerformersService', () => {
  let service: PerformersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(PerformersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
