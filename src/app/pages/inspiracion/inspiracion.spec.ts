import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inspiracion } from './inspiracion';

describe('Inspiracion', () => {
  let component: Inspiracion;
  let fixture: ComponentFixture<Inspiracion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inspiracion],
    }).compileComponents();

    fixture = TestBed.createComponent(Inspiracion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
