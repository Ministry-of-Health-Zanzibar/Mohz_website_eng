import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NtdComponent } from './ntd.component';

describe('NtdComponent', () => {
  let component: NtdComponent;
  let fixture: ComponentFixture<NtdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NtdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NtdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
