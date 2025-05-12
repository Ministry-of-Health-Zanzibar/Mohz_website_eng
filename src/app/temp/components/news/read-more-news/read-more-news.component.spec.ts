import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadMoreNewsComponent } from './read-more-news.component';

describe('ReadMoreNewsComponent', () => {
  let component: ReadMoreNewsComponent;
  let fixture: ComponentFixture<ReadMoreNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadMoreNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadMoreNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
