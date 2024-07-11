import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezervacijeComponent } from './rezervacije.component';

describe('RezervacijeComponent', () => {
  let component: RezervacijeComponent;
  let fixture: ComponentFixture<RezervacijeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RezervacijeComponent]
    });
    fixture = TestBed.createComponent(RezervacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
