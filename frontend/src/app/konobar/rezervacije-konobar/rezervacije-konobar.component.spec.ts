import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezervacijeKonobarComponent } from './rezervacije-konobar.component';

describe('RezervacijeKonobarComponent', () => {
  let component: RezervacijeKonobarComponent;
  let fixture: ComponentFixture<RezervacijeKonobarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RezervacijeKonobarComponent]
    });
    fixture = TestBed.createComponent(RezervacijeKonobarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
