import { Component, OnInit } from '@angular/core';
import { RatingBadgeComponent } from '../../../shared/rating-badge/rating-badge.component';
import { TrendingMoviesService } from '../../../services/movies/trending-movies.service';
import { IMovieCard } from '../../../core/interfaces/movies/movie.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trending',
  imports: [RatingBadgeComponent],
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss', '../home.component.scss'],
})
export class TrendingComponent implements OnInit {
  trendingMovies: IMovieCard[] = [];
  selectedTime: 'day' | 'week' = 'day';

  constructor(private trendingMoviesService: TrendingMoviesService, private router: Router) {}

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

  
  goToMovieDetails(id: number): void {
    this.router.navigate(['/movie', id]);
  }

  ngOnInit(): void {
    this.loadTrending();
  }
}
