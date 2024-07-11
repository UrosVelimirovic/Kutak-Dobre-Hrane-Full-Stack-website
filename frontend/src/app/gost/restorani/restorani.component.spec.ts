import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoraniComponent } from './restorani.component';

describe('RestoraniComponent', () => {
  let component: RestoraniComponent;
  let fixture: ComponentFixture<RestoraniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestoraniComponent]
    });
    fixture = TestBed.createComponent(RestoraniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
