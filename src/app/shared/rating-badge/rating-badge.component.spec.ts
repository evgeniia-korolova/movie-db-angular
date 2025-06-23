import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingBadgeComponent } from './rating-badge.component';

describe('RatingBadgeComponent', () => {
  let component: RatingBadgeComponent;
  let fixture: ComponentFixture<RatingBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
