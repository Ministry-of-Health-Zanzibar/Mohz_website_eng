import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteLinkFormComponent } from './site-link-form.component';

describe('SiteLinkFormComponent', () => {
  let component: SiteLinkFormComponent;
  let fixture: ComponentFixture<SiteLinkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteLinkFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteLinkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
