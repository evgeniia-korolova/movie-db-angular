import { Component, OnInit } from '@angular/core';
import { TrailersComponent } from './trailers/trailers.component';
import { TrendingComponent } from './trending/trending.component';
import { PopularMoviesComponent } from './popular/popular.component';
import { FreeToWatchComponent } from './free-to-watch/free-to-watch.component';


@Component({
  selector: 'app-home',
  imports: [
    TrailersComponent,
    TrendingComponent,
    PopularMoviesComponent,
    FreeToWatchComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  
}
