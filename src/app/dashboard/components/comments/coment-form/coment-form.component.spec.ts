import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentFormComponent } from './coment-form.component';

describe('ComentFormComponent', () => {
  let component: ComentFormComponent;
  let fixture: ComponentFixture<ComentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComentFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
