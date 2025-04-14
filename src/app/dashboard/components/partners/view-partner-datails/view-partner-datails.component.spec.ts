import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPartnerDatailsComponent } from './view-partner-datails.component';

describe('ViewPartnerDatailsComponent', () => {
  let component: ViewPartnerDatailsComponent;
  let fixture: ComponentFixture<ViewPartnerDatailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPartnerDatailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPartnerDatailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
