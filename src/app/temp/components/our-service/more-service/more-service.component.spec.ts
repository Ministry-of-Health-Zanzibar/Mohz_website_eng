import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreServiceComponent } from './more-service.component';

describe('MoreServiceComponent', () => {
  let component: MoreServiceComponent;
  let fixture: ComponentFixture<MoreServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
