import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeListComponent } from './type-list.component';

describe('TypeListComponent', () => {
  let component: TypeListComponent;
  let fixture: ComponentFixture<TypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
