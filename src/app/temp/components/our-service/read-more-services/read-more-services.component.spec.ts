import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadMoreServicesComponent } from './read-more-services.component';

describe('ReadMoreServicesComponent', () => {
  let component: ReadMoreServicesComponent;
  let fixture: ComponentFixture<ReadMoreServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadMoreServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadMoreServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
