import { TestBed } from '@angular/core/testing';

import { GuitarServiceService } from './guitar-service.service';

describe('GuitarServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuitarServiceService = TestBed.get(GuitarServiceService);
    expect(service).toBeTruthy();
  });
});
