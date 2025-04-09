import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventiveHealthEducationComponent } from './preventive-health-education.component';

describe('PreventiveHealthEducationComponent', () => {
  let component: PreventiveHealthEducationComponent;
  let fixture: ComponentFixture<PreventiveHealthEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreventiveHealthEducationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreventiveHealthEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
