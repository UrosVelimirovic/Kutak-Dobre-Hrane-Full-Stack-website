import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZvezdiceComponent } from './zvezdice.component';

describe('ZvezdiceComponent', () => {
  let component: ZvezdiceComponent;
  let fixture: ComponentFixture<ZvezdiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZvezdiceComponent]
    });
    fixture = TestBed.createComponent(ZvezdiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
