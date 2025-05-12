import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltanativeMedicineComponent } from './altanative-medicine.component';

describe('AltanativeMedicineComponent', () => {
  let component: AltanativeMedicineComponent;
  let fixture: ComponentFixture<AltanativeMedicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltanativeMedicineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltanativeMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
