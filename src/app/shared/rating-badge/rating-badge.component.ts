import { DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating-badge',
  imports: [DecimalPipe],
  templateUrl: './rating-badge.component.html',
  styleUrl: './rating-badge.component.scss'
})
export class RatingBadgeComponent {

  @Input() voteAverage: number = 0;
  
  getVoteColor(): string {
    const percentage = Math.round(this.voteAverage * 10);
    if (percentage >= 75) return '#4caf50';
    if (percentage >= 50) return '#ffeb3b';
    return '#f44336';
  }

  getStrokeOffset(): number {
    const percentage = Math.round(this.voteAverage * 10);
    return 251.2 - (percentage / 100) * 251.2;
  }
}
