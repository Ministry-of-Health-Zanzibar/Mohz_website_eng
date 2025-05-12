import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MhhComponent } from './mhh.component';

describe('MhhComponent', () => {
  let component: MhhComponent;
  let fixture: ComponentFixture<MhhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MhhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MhhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
