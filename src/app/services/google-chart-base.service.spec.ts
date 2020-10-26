import { TestBed } from '@angular/core/testing';

import { GoogleChartBaseService } from './google-chart-base.service';

describe('GoogleChartBaseService', () => {
  let service: GoogleChartBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleChartBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
