import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNewsDetailsComponent } from './view-news-details.component';

describe('ViewNewsDetailsComponent', () => {
  let component: ViewNewsDetailsComponent;
  let fixture: ComponentFixture<ViewNewsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewNewsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewNewsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
