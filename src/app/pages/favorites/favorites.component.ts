import { Component, inject } from '@angular/core';
import { IFavoriteItem } from '../../core/interfaces/favorite-item.interface';
import { FavoritesService } from '../../services/favorites.service';
import { FavoriteCardComponent } from './favorite-card/favorite-card.component';

@Component({
  selector: 'app-favorites',
  imports: [FavoriteCardComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  favorites: IFavoriteItem[] = [];
  favoritesService = inject(FavoritesService);

  ngOnInit(): void {
    this.favorites = this.favoritesService.getFavorites();
  }
}
