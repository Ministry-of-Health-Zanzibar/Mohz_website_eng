import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistrySystemDetailComponent } from './ministry-system-detail.component';

describe('MinistrySystemDetailComponent', () => {
  let component: MinistrySystemDetailComponent;
  let fixture: ComponentFixture<MinistrySystemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinistrySystemDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinistrySystemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
