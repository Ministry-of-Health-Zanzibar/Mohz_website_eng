import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAboutUsDetailsComponent } from './view-about-us-details.component';

describe('ViewAboutUsDetailsComponent', () => {
  let component: ViewAboutUsDetailsComponent;
  let fixture: ComponentFixture<ViewAboutUsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAboutUsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAboutUsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
