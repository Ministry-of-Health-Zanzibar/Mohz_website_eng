import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayNewsImageComponent } from './display-news-image.component';

describe('DisplayNewsImageComponent', () => {
  let component: DisplayNewsImageComponent;
  let fixture: ComponentFixture<DisplayNewsImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayNewsImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayNewsImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
