import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteLinkListComponent } from './site-link-list.component';

describe('SiteLinkListComponent', () => {
  let component: SiteLinkListComponent;
  let fixture: ComponentFixture<SiteLinkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteLinkListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteLinkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
