import { TestBed } from '@angular/core/testing';

import { RezervacijaService } from './rezervacija.service';

describe('RezervacijaService', () => {
  let service: RezervacijaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RezervacijaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
