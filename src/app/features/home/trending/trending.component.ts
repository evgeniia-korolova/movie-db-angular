import { Component, OnInit } from '@angular/core';
import { RatingBadgeComponent } from '../../../shared/rating-badge/rating-badge.component';
import { TrendingMoviesService } from '../../../services/movies/trending-movies.service';
import { IMovieCard } from '../../../core/interfaces/movies/movie.interface';

@Component({
  selector: 'app-trending',
  imports: [RatingBadgeComponent],
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss', '../home.component.scss'],
})
export class TrendingComponent implements OnInit {
  trendingMovies: IMovieCard[] = [];
  selectedTime: 'day' | 'week' = 'day';

  constructor(private trendingMoviesService: TrendingMoviesService) {}

  onTimeChange(time: 'day' | 'week') {
    this.selectedTime = time;
    this.loadTrending();
  }

  loadTrending(): void {
    this.trendingMoviesService
      .getTrending('movie', this.selectedTime)
      .subscribe((data) => {
        this.trendingMovies = data.results;
      });
  }

  ngOnInit(): void {
    this.loadTrending();
  }
}
