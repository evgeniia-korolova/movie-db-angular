import { Component, Input, OnInit } from '@angular/core';
import { FreeToWatchService } from '../../../services/free-to-watch.service';
import { RatingBadgeComponent } from '../../../shared/rating-badge/rating-badge.component';

@Component({
  selector: 'app-free-to-watch',
  imports: [RatingBadgeComponent],
  templateUrl: './free-to-watch.component.html',
  styleUrls: ['./free-to-watch.component.scss', '../home.component.scss'],
})
export class FreeToWatchComponent implements OnInit {
  @Input() voteAverage: number = 0;

  freeToWatch: any[] = [];
  selectedCategory = 'movies';
  categories = [
    { label: 'Movies', value: 'movies' },
    { label: 'TV', value: 'tv' },
  ];

  constructor(private freeToWatchService: FreeToWatchService) {}

  loadFreeToWatchByCategory(category: string): void {
    this.selectedCategory = category;
    this.freeToWatchService
      .getFreeToWatchByCategory(category)
      .subscribe((data) => {
        this.freeToWatch = data.results;
      });
  }

  ngOnInit() {
    this.loadFreeToWatchByCategory('movies');
  }
}
