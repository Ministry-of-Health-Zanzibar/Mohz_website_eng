import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBennerImageComponent } from './display-benner-image.component';

describe('DisplayBennerImageComponent', () => {
  let component: DisplayBennerImageComponent;
  let fixture: ComponentFixture<DisplayBennerImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayBennerImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayBennerImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
