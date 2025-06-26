import { Component, Input, OnInit } from '@angular/core';
import { TrailersService } from '../../../services/movies/trailers.service';
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
  latestTrailers: any[] = [];
  activeCategory = this.initialCategory;

  categories = [
    { label: 'Latest', value: 'latest-trailers' },
    { label: 'Popular', value: 'popular' },
    { label: 'Streaming', value: 'streaming' },
    { label: 'On TV', value: 'on-tv' },
    { label: 'For Rent', value: 'for-rent' },
  ];
 

  constructor(private trailerService: TrailersService) {}

  ngOnInit(): void {
    this.loadMovies(this.initialCategory);
  }

  loadLatestTrailers(): void {
    this.trailerService.getLatestTrailers().subscribe((movies: any[]) => {
      this.latestTrailers = movies;
      console.log(this.latestTrailers);

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
        const isTV = movie.media_type === 'tv' || 'first_air_date' in movie;

        const trailer$ = isTV
          ? this.trailerService.getTVTrailer(movie.id)
          : this.trailerService.getMovieTrailer(movie.id);

        trailer$.subscribe((key) => {
          movie.trailerKey = key;
        });
      });
    });
  }

  openTrailer(key: string) {
    window.open(`https://www.youtube.com/watch?v=${key}`, '_blank');
  }
}

