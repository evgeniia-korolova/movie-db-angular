import { Component, Input, OnInit } from '@angular/core';
import { TrailersService } from '../../../services/trailers.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-trailers',
  imports: [TitleCasePipe],
  templateUrl: './trailers.component.html',
  styleUrls: ['./trailers.component.scss', '../home.component.scss'],
})
export class TrailersComponent implements OnInit {
  @Input() initialCategory: string = 'popular';
  latestTrailers: any[] = [];
  // categories = ['popular', 'streaming', 'on-tv', 'for-rent', 'in-theatres'];
  activeCategory = this.initialCategory;

  categories = [
    {label: 'Popular', value: 'popular'},
    { label: 'Streaming', value: 'streaming' },
    { label: 'On TV', value: 'on-tv' },
    { label: 'For Rent', value: 'for-rent' },
    { label: 'In Theaters', value: 'in-theaters' },
  ];

  constructor(private trailerService: TrailersService) {}

  ngOnInit(): void {
    this.loadMovies(this.initialCategory);
  }

  loadMovies(category: string) {
    this.activeCategory = category;
    this.trailerService.getMoviesByCategory(category).subscribe((res) => {
      this.latestTrailers = res.results;

      this.latestTrailers.forEach((movie) => {
        this.trailerService.getMovieTrailer2(movie.id).subscribe((key) => {
          movie.trailerKey = key;
        });
      });
    });
  }

  openTrailer(key: string) {
    window.open(`https://www.youtube.com/watch?v=${key}`, '_blank');
  }
}
