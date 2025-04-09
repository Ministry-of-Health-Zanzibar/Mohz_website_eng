import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSiteLinkDetailsComponent } from './view-site-link-details.component';

describe('ViewSiteLinkDetailsComponent', () => {
  let component: ViewSiteLinkDetailsComponent;
  let fixture: ComponentFixture<ViewSiteLinkDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSiteLinkDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSiteLinkDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
