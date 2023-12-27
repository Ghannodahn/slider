import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ShowStateService } from './show-state.service';

describe('ShowStateService', () => {
  let service: ShowStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ShowStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
