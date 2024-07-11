import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DostavaHraneComponent } from './dostava-hrane.component';

describe('DostavaHraneComponent', () => {
  let component: DostavaHraneComponent;
  let fixture: ComponentFixture<DostavaHraneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DostavaHraneComponent]
    });
    fixture = TestBed.createComponent(DostavaHraneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
