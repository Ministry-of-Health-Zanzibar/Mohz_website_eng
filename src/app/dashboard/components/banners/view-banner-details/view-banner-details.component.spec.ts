import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBannerDetailsComponent } from './view-banner-details.component';

describe('ViewBannerDetailsComponent', () => {
  let component: ViewBannerDetailsComponent;
  let fixture: ComponentFixture<ViewBannerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewBannerDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBannerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
