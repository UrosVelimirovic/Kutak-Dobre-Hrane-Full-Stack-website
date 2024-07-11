import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeregistrovaniKorisnikComponent } from './neregistrovani-korisnik.component';

describe('NeregistrovaniKorisnikComponent', () => {
  let component: NeregistrovaniKorisnikComponent;
  let fixture: ComponentFixture<NeregistrovaniKorisnikComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NeregistrovaniKorisnikComponent]
    });
    fixture = TestBed.createComponent(NeregistrovaniKorisnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
