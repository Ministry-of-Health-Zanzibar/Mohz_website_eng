import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistrySystemComponent } from './ministry-system.component';

describe('MinistrySystemComponent', () => {
  let component: MinistrySystemComponent;
  let fixture: ComponentFixture<MinistrySystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinistrySystemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinistrySystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
