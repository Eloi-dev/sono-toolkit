import { TestBed } from '@angular/core/testing';

import { LimiterThresholdService } from './limiter-threshold.service';

describe('LimiterThresholdService', () => {
  let service: LimiterThresholdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LimiterThresholdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
