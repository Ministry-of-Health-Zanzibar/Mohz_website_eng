import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurretiveComponent } from './curretive.component';

describe('CurretiveComponent', () => {
  let component: CurretiveComponent;
  let fixture: ComponentFixture<CurretiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurretiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurretiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
