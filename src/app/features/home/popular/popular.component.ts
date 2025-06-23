import { Component, OnInit } from '@angular/core';
import { PopularMoviesService } from '../../../services/popular-movies.service';
import { RatingBadgeComponent } from '../../../shared/rating-badge/rating-badge.component';

@Component({
  selector: 'app-popular-movies',
  imports: [RatingBadgeComponent],
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss', '../home.component.scss']
})
export class PopularMoviesComponent implements OnInit {
  popularMovies: any[] = [];
  selectedCategory = 'streaming';

  categories = [
    { label: 'Streaming', value: 'streaming' },
    { label: 'On TV', value: 'on-tv' },
    { label: 'For Rent', value: 'for-rent' },
    { label: 'In Theaters', value: 'in-theaters' },
  ];

  constructor(private popularMoviesService: PopularMoviesService) {}

  loadPopularMovies(category: string): void {
    this.selectedCategory = category;
    this.popularMoviesService.getPopularByCategory(category).subscribe((data) => {
      this.popularMovies = data.results;
    });
  }

  ngOnInit(): void {
    this.loadPopularMovies('streaming');
  }

}
