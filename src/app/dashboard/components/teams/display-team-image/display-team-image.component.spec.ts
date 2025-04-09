import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTeamImageComponent } from './display-team-image.component';

describe('DisplayTeamImageComponent', () => {
  let component: DisplayTeamImageComponent;
  let fixture: ComponentFixture<DisplayTeamImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayTeamImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayTeamImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
