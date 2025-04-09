import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreAnnoucementComponent } from './more-annoucement.component';

describe('MoreAnnoucementComponent', () => {
  let component: MoreAnnoucementComponent;
  let fixture: ComponentFixture<MoreAnnoucementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreAnnoucementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreAnnoucementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
