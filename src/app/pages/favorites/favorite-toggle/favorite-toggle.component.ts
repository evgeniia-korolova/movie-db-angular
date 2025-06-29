import { Component, inject, Input } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FavoritesService } from '../../../services/favorites.service';
import { IFavoriteItem } from '../../../core/interfaces/favorite-item.interface';
import { FavoriteIconComponent } from '../../../shared/icons/favorite-icon/favorite-icon.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-favorite-toggle',
  imports: [FavoriteIconComponent, NgIf],
  templateUrl: './favorite-toggle.component.html',
  styleUrl: './favorite-toggle.component.scss',
})
export class FavoriteToggleComponent {
  @Input() id!: number;
  @Input() media_type!: 'movie' | 'tv';
  @Input() title!: string;
  @Input() poster_path?: string;

  isFilled = false;
  showTooltip = false;

  constructor(
    private favoritesService: FavoritesService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.updateState();
  }

  updateState(): void {
    this.isFilled = this.favoritesService.isFavorite(this.id, this.media_type);
  }

  toggleFavorite(): void {
    if (!this.authService.isAuthenticated()) return;

    const item: IFavoriteItem = {
      id: this.id,
      media_type: this.media_type,
      title: this.title,
      poster_path: this.poster_path,
    };

    this.favoritesService.toggleFavorite(item);
    this.updateState();
  }
}
