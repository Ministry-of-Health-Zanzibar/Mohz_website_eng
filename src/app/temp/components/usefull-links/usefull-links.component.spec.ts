import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsefullLinksComponent } from './usefull-links.component';

describe('UsefullLinksComponent', () => {
  let component: UsefullLinksComponent;
  let fixture: ComponentFixture<UsefullLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsefullLinksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsefullLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
