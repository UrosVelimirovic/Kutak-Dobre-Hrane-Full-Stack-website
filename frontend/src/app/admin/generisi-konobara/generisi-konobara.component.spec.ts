import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerisiKonobaraComponent } from './generisi-konobara.component';

describe('GenerisiKonobaraComponent', () => {
  let component: GenerisiKonobaraComponent;
  let fixture: ComponentFixture<GenerisiKonobaraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerisiKonobaraComponent]
    });
    fixture = TestBed.createComponent(GenerisiKonobaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
