import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetailsService } from '../../services/movies/movie-details.service';
import { RatingBadgeComponent } from '../../shared/rating-badge/rating-badge.component';
import { FavoriteIconComponent } from '../../shared/icons/favorite-icon/favorite-icon.component';
import { FavoritesService } from '../../services/favorites.service';
import { IFavoriteItem } from '../../core/interfaces/favorite-item.interface';
import { IContentDetails } from '../../core/interfaces/movies/movie.interface';
import { isMovieCard, isMovieDetails,  isTVDetails } from '../../core/utils/content-card.utils';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  imports: [RatingBadgeComponent, FavoriteIconComponent],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})


export class MovieDetailsComponent  {
  movieId!: number;
  mediaType!: 'movie' | 'tv';
  movie!: IContentDetails;
  isMovieDetails  = isMovieDetails;
  isTVDetails = isTVDetails;

  imageUrl = 'https://image.tmdb.org/t/p/w500';

  constructor(
    private route: ActivatedRoute,
    private movieDetailsService: MovieDetailsService,
    private favoritesService: FavoritesService
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

  loadDetails(): void {
    const details$: Observable<IContentDetails> =
      this.mediaType === 'movie'
        ? this.movieDetailsService.getMovieDetails(this.movieId)
        : this.movieDetailsService.getTVDetails(this.movieId);

    details$.subscribe((data: IContentDetails) => {
      this.movie = data;
    });
  }

  get title(): string {
    if (isMovieDetails(this.movie)) return this.movie.title ?? '';
    if (isTVDetails(this.movie)) return this.movie.name ?? '';
    return '';
  }
  

  get releaseDate(): string {
    if (isMovieDetails(this.movie)) return this.movie.release_date ?? '';
    if (isTVDetails(this.movie)) return this.movie.first_air_date ?? '';
    return '';
  }
  
  

  isFavorite(): boolean {
    return this.favoritesService.isFavorite(this.movieId, this.mediaType);
  }

  toggleFavorite(): void {
    const favoriteItem: IFavoriteItem = {
      id: this.movieId,
      title: this.title,
      media_type: this.mediaType,
      poster_path: this.movie.poster_path,
    };

    this.favoritesService.toggleFavorite(favoriteItem);
  }
}




