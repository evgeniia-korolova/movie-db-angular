import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetailsService } from '../../services/movies/movie-details.service';
import { RatingBadgeComponent } from '../../shared/rating-badge/rating-badge.component';

import { IContentDetails } from '../../core/interfaces/movies/movie.interface';
import {
  isMovieDetails,
  isTVDetails,
} from '../../core/utils/content-card.utils';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { FavoriteToggleComponent } from '../favorites/favorite-toggle/favorite-toggle.component';
import { IFavoriteItem } from '../../core/interfaces/favorite-item.interface';

@Component({
  selector: 'app-movie-details',
  imports: [RatingBadgeComponent, FavoriteToggleComponent],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent implements OnInit {
  movieId!: number;
  mediaType!: 'movie' | 'tv';
  movie!: IContentDetails;
  title = '';

  isMovieDetails = isMovieDetails;
  isTVDetails = isTVDetails;
  showTooltip = false;

  authService = inject(AuthService);

  imageUrl = 'https://image.tmdb.org/t/p/w500';

  constructor(
    private route: ActivatedRoute,
    private movieDetailsService: MovieDetailsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      const type = params.get('type') as 'movie' | 'tv';

      if (id && type) {
        this.movieId = +id;
        this.mediaType = type;
        this.loadDetails();
      }
    });
  }

  get favoriteItem(): IFavoriteItem {
    return {
      id: this.movieId,
      media_type: this.mediaType,
      title: this.title,
      poster_path: this.movie?.poster_path,
    };
  }

  loadDetails(): void {
    const details$: Observable<IContentDetails> =
      this.mediaType === 'movie'
        ? this.movieDetailsService.getMovieDetails(this.movieId)
        : this.movieDetailsService.getTVDetails(this.movieId);

    details$.subscribe((data: IContentDetails) => {
      this.movie = data;

      if ('title' in data) {
        this.title = data.title ?? '';
      } else if ('name' in data) {
        this.title = data.name ?? '';
      }
    });
  }
 

  get releaseDate(): string {
    if (isMovieDetails(this.movie)) return this.movie.release_date ?? '';
    if (isTVDetails(this.movie)) return this.movie.first_air_date ?? '';
    return '';
  }
}
