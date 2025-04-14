import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffMailComponent } from './staff-mail.component';

describe('StaffMailComponent', () => {
  let component: StaffMailComponent;
  let fixture: ComponentFixture<StaffMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffMailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
