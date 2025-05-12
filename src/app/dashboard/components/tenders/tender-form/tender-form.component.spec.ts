import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderFormComponent } from './tender-form.component';

describe('TenderFormComponent', () => {
  let component: TenderFormComponent;
  let fixture: ComponentFixture<TenderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenderFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
