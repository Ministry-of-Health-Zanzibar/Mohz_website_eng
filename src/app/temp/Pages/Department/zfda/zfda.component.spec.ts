import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZfdaComponent } from './zfda.component';

describe('ZfdaComponent', () => {
  let component: ZfdaComponent;
  let fixture: ComponentFixture<ZfdaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZfdaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZfdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
