import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistrySystemListComponent } from './ministry-system-list.component';

describe('MinistrySystemListComponent', () => {
  let component: MinistrySystemListComponent;
  let fixture: ComponentFixture<MinistrySystemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinistrySystemListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinistrySystemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
