import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZihtlpComponent } from './zihtlp.component';

describe('ZihtlpComponent', () => {
  let component: ZihtlpComponent;
  let fixture: ComponentFixture<ZihtlpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZihtlpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZihtlpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
