import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadMoreEventsComponent } from './read-more-events.component';

describe('ReadMoreEventsComponent', () => {
  let component: ReadMoreEventsComponent;
  let fixture: ComponentFixture<ReadMoreEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadMoreEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadMoreEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
