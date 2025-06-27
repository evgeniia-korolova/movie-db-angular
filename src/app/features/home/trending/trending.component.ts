import { Component, OnInit } from '@angular/core';
import { RatingBadgeComponent } from '../../../shared/rating-badge/rating-badge.component';
import { TrendingMoviesService } from '../../../services/movies/trending-movies.service';
import {
  IContentCard,
  IMovieCard,
} from '../../../core/interfaces/movies/movie.interface';
import { Router } from '@angular/router';
import { ITVCard } from '../../../core/interfaces/tv/tv.interface';

@Component({
  selector: 'app-trending',
  imports: [RatingBadgeComponent],
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss', '../home.component.scss'],
})
export class TrendingComponent implements OnInit {
  trendingMovies: IContentCard[] = [];
  selectedTime: 'day' | 'week' = 'day';

  constructor(
    private trendingMoviesService: TrendingMoviesService,
    private router: Router
  ) {}

  onTimeChange(time: 'day' | 'week') {
    this.selectedTime = time;
    this.loadTrending();
  }

  getTitle(card: IContentCard): string {
    if (card.media_type === 'tv') {
      return (card as ITVCard).name ?? '';
    } else {
      return (card as IMovieCard).title ?? '';
    }
  }

  getDate(card: IContentCard): string {
    return 'release_date' in card ? card.release_date : card.first_air_date;
  }

  loadTrending(): void {
    this.trendingMoviesService
      .getTrending('movie', this.selectedTime)
      .subscribe((data) => {
        this.trendingMovies = data.results;
      });
  }

  goToMovieDetails(card: IContentCard): void {
    this.router.navigate(['/details', card.media_type, card.id]);
  }

  ngOnInit(): void {
    this.loadTrending();
  }
}
