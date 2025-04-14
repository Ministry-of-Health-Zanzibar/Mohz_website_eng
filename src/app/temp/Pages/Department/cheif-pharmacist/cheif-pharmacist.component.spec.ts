import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheifPharmacistComponent } from './cheif-pharmacist.component';

describe('CheifPharmacistComponent', () => {
  let component: CheifPharmacistComponent;
  let fixture: ComponentFixture<CheifPharmacistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheifPharmacistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheifPharmacistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
