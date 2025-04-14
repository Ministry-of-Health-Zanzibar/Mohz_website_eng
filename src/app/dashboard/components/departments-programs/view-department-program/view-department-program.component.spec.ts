import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDepartmentProgramComponent } from './view-department-program.component';

describe('ViewDepartmentProgramComponent', () => {
  let component: ViewDepartmentProgramComponent;
  let fixture: ComponentFixture<ViewDepartmentProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDepartmentProgramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDepartmentProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
