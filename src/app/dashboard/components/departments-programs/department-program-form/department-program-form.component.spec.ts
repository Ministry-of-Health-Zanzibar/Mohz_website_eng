import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentProgramFormComponent } from './department-program-form.component';

describe('DepartmentProgramFormComponent', () => {
  let component: DepartmentProgramFormComponent;
  let fixture: ComponentFixture<DepartmentProgramFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentProgramFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentProgramFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
