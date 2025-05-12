import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthRegistrationLecensesComponent } from './health-registration-lecenses.component';

describe('HealthRegistrationLecensesComponent', () => {
  let component: HealthRegistrationLecensesComponent;
  let fixture: ComponentFixture<HealthRegistrationLecensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthRegistrationLecensesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthRegistrationLecensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
