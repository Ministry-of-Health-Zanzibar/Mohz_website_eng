import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewServiceDetailsComponent } from './view-service-details.component';

describe('ViewServiceDetailsComponent', () => {
  let component: ViewServiceDetailsComponent;
  let fixture: ComponentFixture<ViewServiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewServiceDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
