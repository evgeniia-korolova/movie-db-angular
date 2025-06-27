import { Component, OnInit } from '@angular/core';
import { PopularMoviesService } from '../../../services/movies/popular-movies.service';
import { RatingBadgeComponent } from '../../../shared/rating-badge/rating-badge.component';
import {
  IContentCard,
  IMovieCard,
} from '../../../core/interfaces/movies/movie.interface';
import { ITVCard } from '../../../core/interfaces/tv/tv.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popular-movies',
  imports: [RatingBadgeComponent],
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss', '../home.component.scss'],
})
export class PopularMoviesComponent implements OnInit {
  popularMovies: IContentCard[] = [];
  selectedCategory = 'streaming';

  categories = [
    { label: 'Streaming', value: 'streaming' },
    { label: 'On TV', value: 'on-tv' },
    { label: 'For Rent', value: 'for-rent' },
  ];

  constructor(private popularMoviesService: PopularMoviesService, private router: Router) {}

  loadPopularMovies(category: string): void {
    this.selectedCategory = category;
    this.popularMoviesService
      .getPopularByCategory(category)
      .subscribe((data) => {
        this.popularMovies = data.results;
        console.log(this.popularMovies);
      });
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

  goToMovieDetails(id: number): void {
    this.router.navigate(['/movie', id]);
  }
  

  ngOnInit(): void {
    this.loadPopularMovies(this.selectedCategory);
  }
}
