import { Component, Input, OnInit } from '@angular/core';
import { FreeToWatchService } from '../../../services/movies/free-to-watch.service';
import { RatingBadgeComponent } from '../../../shared/rating-badge/rating-badge.component';
import {
  IContentCard,
  IMovieCard,
} from '../../../core/interfaces/movies/movie.interface';
import { ITVCard } from '../../../core/interfaces/tv/tv.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-free-to-watch',
  imports: [RatingBadgeComponent],
  templateUrl: './free-to-watch.component.html',
  styleUrls: ['./free-to-watch.component.scss', '../home.component.scss'],
})
export class FreeToWatchComponent implements OnInit {
  @Input() voteAverage: number = 0;

  freeToWatch: IContentCard[] = [];
  selectedCategory = 'movies';
  categories = [
    { label: 'Movies', value: 'movies' },
    { label: 'TV', value: 'tv' },
  ];

  constructor(
    private freeToWatchService: FreeToWatchService,
    private router: Router
  ) {}

  loadFreeToWatchByCategory(category: string): void {
    this.selectedCategory = category;

    const mediaType = category === 'tv' ? 'tv' : 'movie';

    this.freeToWatchService
      .getFreeToWatchByCategory(category)
      .subscribe((data) => {
        this.freeToWatch = data.results.map((item: any) => ({
          ...item,
          media_type: mediaType,
        }));
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

  goToMovieDetails(card: IContentCard): void {
    this.router.navigate(['/details', card.media_type, card.id]);
  }

  ngOnInit() {
    this.loadFreeToWatchByCategory('movies');
  }
}
