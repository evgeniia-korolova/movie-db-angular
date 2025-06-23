import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { DecimalPipe } from '@angular/common';
import { TrailersComponent } from './trailers/trailers.component';
import { TrendingComponent } from './trending/trending.component';
import { PopularMoviesComponent } from './popular/popular.component';

@Component({
  selector: 'app-home',
  imports: [DecimalPipe, TrailersComponent, TrendingComponent, PopularMoviesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {   
  freeToWatch: any[] = []; 

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
 

  ngOnInit() {
    this.movieService.getFreeToWatch().subscribe((data) => {
      this.freeToWatch = data.results;
    });
  }
}
