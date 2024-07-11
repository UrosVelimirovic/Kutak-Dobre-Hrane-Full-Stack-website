import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoranGenerateComponent } from './restoran-generate.component';

describe('RestoranGenerateComponent', () => {
  let component: RestoranGenerateComponent;
  let fixture: ComponentFixture<RestoranGenerateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestoranGenerateComponent]
    });
    fixture = TestBed.createComponent(RestoranGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
