import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursingMidwiferyComponent } from './nursing-midwifery.component';

describe('NursingMidwiferyComponent', () => {
  let component: NursingMidwiferyComponent;
  let fixture: ComponentFixture<NursingMidwiferyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NursingMidwiferyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NursingMidwiferyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
