import { Component, Input, OnInit } from '@angular/core';
import { TrailersService } from '../../../services/trailers.service';
import { TitleCasePipe } from '@angular/common';
import { forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { IMovieWithTrailer } from '../../../core/interfaces/movie';

@Component({
  selector: 'app-trailers',
  imports: [TitleCasePipe],
  templateUrl: './trailers.component.html',
  styleUrls: ['./trailers.component.scss', '../home.component.scss'],
})
export class TrailersComponent implements OnInit {
  @Input() initialCategory: string = 'latest-trailers';
  latestTrailers: IMovieWithTrailer[] = [];
  activeCategory = this.initialCategory;

  categories = [
    { label: 'Latest', value: 'latest-trailers' },
    { label: 'Popular', value: 'popular' },
    { label: 'Streaming', value: 'streaming' },
    { label: 'On TV', value: 'on-tv' },
    { label: 'For Rent', value: 'for-rent' },
  ];
  moviesWithTrailers: unknown;

  constructor(private trailerService: TrailersService) {}

  ngOnInit(): void {
    this.loadMovies(this.initialCategory);
    // this.loadLatestTrailers();
  }

  loadLatestTrailers(): void {
    this.trailerService
      .getLatestTrailers()
      .subscribe((movies: IMovieWithTrailer[]) => {
        this.latestTrailers = movies;
        this.activeCategory = 'latest-trailers';
      });
  }

  loadMovies(category: string) {
    this.activeCategory = category;
    if (category === 'latest-trailers') {
      this.loadLatestTrailers();
    }
    this.trailerService.getMoviesByCategory(category).subscribe((res) => {
      this.latestTrailers = res.results;

      this.latestTrailers.forEach((movie) => {
        this.trailerService.getMovieTrailer(movie.id).subscribe((key) => {
          movie.trailerKey = key;
        });
      });
    });
  }

  openTrailer(key: string) {
    window.open(`https://www.youtube.com/watch?v=${key}`, '_blank');
  }
}
