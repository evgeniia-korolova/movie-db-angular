import { Injectable } from '@angular/core';

import { IFavoriteItem } from '../core/interfaces/favorite-item.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private storageKey = 'favoriteItems';
  private favoritesSubject = new BehaviorSubject<IFavoriteItem[]>(
    this.getFavorites()
  );
  favoritesChanged$ = this.favoritesSubject.asObservable();

  getFavorites(): IFavoriteItem[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveFavorites(favorites: IFavoriteItem[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }

  isFavorite(id: number, mediaType: string): boolean {
    return this.getFavorites().some(
      (item) => item.id === id && item.media_type === mediaType
    );
  }

  addFavorite(item: IFavoriteItem): void {
    const favorites = this.getFavorites();
    if (!this.isFavorite(item.id, item.media_type)) {
      favorites.push(item);
      this.favoritesSubject.next(favorites);
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    }
  }

  removeFavorite(id: number, mediaType: 'movie' | 'tv'): void {
    const updated = this.getFavorites().filter(
      (item) => item.id !== id || item.media_type !== mediaType
    );
    this.saveFavorites(updated);
    this.favoritesSubject.next(updated);
  }

  toggleFavorite(item: IFavoriteItem): void {
    if (this.isFavorite(item.id, item.media_type)) {
      this.removeFavorite(item.id, item.media_type);
    } else {
      this.addFavorite(item);
    }
  }
}
