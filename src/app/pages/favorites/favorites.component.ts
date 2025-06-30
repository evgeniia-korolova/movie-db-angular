import { Component, inject } from '@angular/core';
import { IFavoriteItem } from '../../core/interfaces/favorite-item.interface';
import { FavoritesService } from '../../services/favorites.service';
import { FavoriteCardComponent } from './favorite-card/favorite-card.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',
  imports: [FavoriteCardComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  favorites: IFavoriteItem[] = [];
  favoritesService = inject(FavoritesService);
  private subscription!: Subscription;

  ngOnInit(): void {
    this.favorites = this.favoritesService.getFavorites();

    this.subscription = this.favoritesService.favoritesChanged$.subscribe(
      (updatedFavorites) => {
        this.favorites = updatedFavorites;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
