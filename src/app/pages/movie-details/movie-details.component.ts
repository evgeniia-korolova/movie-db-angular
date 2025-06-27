import { Component } from '@angular/core';
import { IMovieDetails } from '../../core/interfaces/movies/movie.interface';
import { ActivatedRoute } from '@angular/router';
import { MovieDetailsService } from '../../services/movies/movie-details.service';
import { RatingBadgeComponent } from '../../shared/rating-badge/rating-badge.component';

@Component({
  selector: 'app-movie-details',
  imports: [RatingBadgeComponent],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent {
  movieId!: number;
  movie!: IMovieDetails;
  imageUrl = 'https://image.tmdb.org/t/p/w500';


  constructor(
    private route: ActivatedRoute,
    private movieDetailsService: MovieDetailsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {      
  
      const id = params.get('id');
      console.log('id from route:', id);
  
      if (id) {
        this.movieId = +id;
        this.loadMovieDetails();
      } else {
        console.warn('ID не найден в параметрах маршрута');
      }
    });
  }

  loadMovieDetails(): void {
    this.movieDetailsService.getMovieDetails(this.movieId).subscribe((movie) => {
      
      this.movie = movie;
      console.log(movie);
      
    });
  }
}
