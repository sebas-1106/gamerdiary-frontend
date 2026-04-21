import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCitasComponent } from './admin-citas';

describe('AdminCitasComponent', () => {
  let component: AdminCitasComponent;
  let fixture: ComponentFixture<AdminCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCitasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminCitasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
