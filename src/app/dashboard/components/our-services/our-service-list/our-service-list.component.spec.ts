import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurServiceListComponent } from './our-service-list.component';

describe('OurServiceListComponent', () => {
  let component: OurServiceListComponent;
  let fixture: ComponentFixture<OurServiceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurServiceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
