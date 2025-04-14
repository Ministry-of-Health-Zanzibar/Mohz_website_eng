import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentProgramListComponent } from './department-program-list.component';

describe('DepartmentProgramListComponent', () => {
  let component: DepartmentProgramListComponent;
  let fixture: ComponentFixture<DepartmentProgramListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentProgramListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentProgramListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
