import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalStoreComponent } from './medical-store.component';

describe('MedicalStoreComponent', () => {
  let component: MedicalStoreComponent;
  let fixture: ComponentFixture<MedicalStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalStoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
