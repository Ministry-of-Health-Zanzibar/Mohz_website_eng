import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZamepComponent } from './zamep.component';

describe('ZamepComponent', () => {
  let component: ZamepComponent;
  let fixture: ComponentFixture<ZamepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZamepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZamepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
