import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStranicaComponent } from './admin-stranica.component';

describe('AdminStranicaComponent', () => {
  let component: AdminStranicaComponent;
  let fixture: ComponentFixture<AdminStranicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminStranicaComponent]
    });
    fixture = TestBed.createComponent(AdminStranicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
