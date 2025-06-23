import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TrailersComponent } from './trailers/trailers.component';
import { TrendingComponent } from './trending/trending.component';

@Component({
  selector: 'app-home',
  imports: [DecimalPipe, TrailersComponent, TrendingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {    
  popularMovies: any[] = [];
  freeToWatch: any[] = [];

  selectedCategory = 'streaming';
  selectedCategoryTrailer = 'popular'; 
  

  categories = [
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
 

  ngOnInit() {      

    this.loadPopularMovies('streaming');

    this.movieService.getFreeToWatch().subscribe((data) => {
      this.freeToWatch = data.results;
    });
  }
}
