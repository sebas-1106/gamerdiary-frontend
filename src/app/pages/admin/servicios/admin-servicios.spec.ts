import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminServiciosComponent } from './admin-servicios';

describe('AdminServiciosComponent', () => {
  let component: AdminServiciosComponent;
  let fixture: ComponentFixture<AdminServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminServiciosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminServiciosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
