import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoucentComponent } from './annoucent.component';

describe('AnnoucentComponent', () => {
  let component: AnnoucentComponent;
  let fixture: ComponentFixture<AnnoucentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnoucentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnoucentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
