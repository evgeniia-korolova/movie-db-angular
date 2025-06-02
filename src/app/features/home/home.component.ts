import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  trendingMovies: any[] = [];
  latestTrailers: any[] = [];
  popularMovies: any[] = [];
  freeToWatch: any[] = [];


  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getTrendingMovies().subscribe((data) => {
      this.trendingMovies = data.results;
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
