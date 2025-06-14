import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { DecimalPipe } from '@angular/common';

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
    this.movieService.getTrendingMovies().subscribe((data) => {
      this.trendingMovies = data.results;
      console.log(data.results);
    });

    this.movieService.getLatestTrailers().subscribe((data) => {
      this.latestTrailers = data.results;
    });

    this.movieService.getPopularMovies().subscribe((data) => {
      this.popularMovies = data.results;
    });

    this.movieService.getFreeToWatch().subscribe((data) => {
      this.freeToWatch = data.results;
    });
  }
}
