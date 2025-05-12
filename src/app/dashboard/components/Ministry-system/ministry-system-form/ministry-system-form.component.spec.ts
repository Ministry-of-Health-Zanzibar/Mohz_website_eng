import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistrySystemFormComponent } from './ministry-system-form.component';

describe('MinistrySystemFormComponent', () => {
  let component: MinistrySystemFormComponent;
  let fixture: ComponentFixture<MinistrySystemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinistrySystemFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinistrySystemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
