import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerFormComponent } from './partner-form.component';

describe('PartnerFormComponent', () => {
  let component: PartnerFormComponent;
  let fixture: ComponentFixture<PartnerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
