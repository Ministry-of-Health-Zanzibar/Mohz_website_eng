import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAboutUsImageComponent } from './display-about-us-image.component';

describe('DisplayAboutUsImageComponent', () => {
  let component: DisplayAboutUsImageComponent;
  let fixture: ComponentFixture<DisplayAboutUsImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayAboutUsImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayAboutUsImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
