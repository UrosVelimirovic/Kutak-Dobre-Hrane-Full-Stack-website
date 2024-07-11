import { TestBed } from '@angular/core/testing';

import { NarudzbinaService } from '../services/narudzbina.service';

describe('NarudzbinaService', () => {
  let service: NarudzbinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NarudzbinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
