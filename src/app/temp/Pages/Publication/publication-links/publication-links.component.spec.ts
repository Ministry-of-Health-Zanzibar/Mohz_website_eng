import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationLinksComponent } from './publication-links.component';

describe('PublicationLinksComponent', () => {
  let component: PublicationLinksComponent;
  let fixture: ComponentFixture<PublicationLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicationLinksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicationLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
