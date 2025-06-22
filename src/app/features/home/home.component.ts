import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [DecimalPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  trendingMovies: any[] = [];
  latestTrailers: any[] = [];
  popularMovies: any[] = [];
  freeToWatch: any[] = [];

  selectedCategory = 'streaming';
  selectedCategoryTrailer = 'popular';
  
  selectedTime: 'day' | 'week' = 'day';

  categories = [
    { label: 'Streaming', value: 'streaming' },
    { label: 'On TV', value: 'on-tv' },
    { label: 'For Rent', value: 'for-rent' },
    { label: 'In Theaters', value: 'in-theaters' },
  ];

  categoriesTrailers = [
    {label: 'Popular', value: 'popular'},
    { label: 'Streaming', value: 'streaming' },
    { label: 'On TV', value: 'on-tv' },
    { label: 'For Rent', value: 'for-rent' },
    { label: 'In Theaters', value: 'in-theaters' },
  ];

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

  loadPopularMovies(category: string): void {
    this.selectedCategory = category;
    this.movieService.getPopularByCategory(category).subscribe((data) => {
      this.popularMovies = data.results;
    });
  }


  loadTrending(): void {
    this.movieService.getTrending('movie', this.selectedTime).subscribe((data) => {
      this.trendingMovies = data.results;
    });
  }
  
  onTimeChange(time: 'day' | 'week') {
    this.selectedTime = time;
    this.loadTrending();
  }

  loadTrailers(category: string = 'popular') {
    this.movieService.getMoviesByCategory(category).subscribe((data) => {
      this.latestTrailers = data.results;
      this.selectedCategoryTrailer = category;
  
      // загружаем трейлеры для первых 10 фильмов
      this.latestTrailers.forEach((movie: any) => {
        this.movieService.getMovieTrailer(movie.id).subscribe((videoData) => {
          const trailer = videoData.results.find(
            (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
          );
          movie.trailerKey = trailer?.key;
        });
      });
    });
  }

  ngOnInit() {
   
    this.loadTrending();

    // this.movieService.getLatestTrailers().subscribe((data) => {
    //   this.latestTrailers = data.results;
    // });

    this.loadTrailers('popular')

    this.loadPopularMovies('streaming');

    this.movieService.getFreeToWatch().subscribe((data) => {
      this.freeToWatch = data.results;
    });
  }
}
