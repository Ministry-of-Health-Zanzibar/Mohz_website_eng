import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationHrComponent } from './administration-hr.component';

describe('AdministrationHrComponent', () => {
  let component: AdministrationHrComponent;
  let fixture: ComponentFixture<AdministrationHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministrationHrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrationHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
