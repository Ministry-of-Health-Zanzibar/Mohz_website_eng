import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurServiceFormComponent } from './our-service-form.component';

describe('OurServiceFormComponent', () => {
  let component: OurServiceFormComponent;
  let fixture: ComponentFixture<OurServiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurServiceFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurServiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
