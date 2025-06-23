import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../services/movie.service';
import { RatingBadgeComponent } from '../../../shared/rating-badge/rating-badge.component';

@Component({
  selector: 'app-trending',
  imports: [RatingBadgeComponent],
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss', '../home.component.scss']
})
export class TrendingComponent implements OnInit{
  trendingMovies: any[] = [];
  selectedTime: 'day' | 'week' = 'day';
  

  constructor(private movieService: MovieService) {}

  getVoteColor(vote: number): string {
    const percentage = Math.round(vote * 10);
    if (percentage >= 75) return '#4caf50';
    if (percentage >= 50) return '#ffeb3b';
    return '#f44336';
  }

  getStrokeOffset(vote: number): number {
    const percentage = Math.round(vote * 10);
    return 251.2 - (percentage / 100) * 251.2;
  }

  onTimeChange(time: 'day' | 'week') {
    this.selectedTime = time;
    this.loadTrending();
  }

  loadTrending(): void {
    this.movieService.getTrending('movie', this.selectedTime).subscribe((data) => {
      this.trendingMovies = data.results;
    });
  }

  ngOnInit(): void {
    this.loadTrending(); 
  }

}
