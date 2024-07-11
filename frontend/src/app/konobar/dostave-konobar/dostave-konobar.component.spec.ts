import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DostaveKonobarComponent } from './dostave-konobar.component';

describe('DostaveKonobarComponent', () => {
  let component: DostaveKonobarComponent;
  let fixture: ComponentFixture<DostaveKonobarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DostaveKonobarComponent]
    });
    fixture = TestBed.createComponent(DostaveKonobarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
