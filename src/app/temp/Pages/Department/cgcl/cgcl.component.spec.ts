import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgclComponent } from './cgcl.component';

describe('CgclComponent', () => {
  let component: CgclComponent;
  let fixture: ComponentFixture<CgclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CgclComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CgclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
