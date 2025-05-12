import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrchComponent } from './irch.component';

describe('IrchComponent', () => {
  let component: IrchComponent;
  let fixture: ComponentFixture<IrchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IrchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IrchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
