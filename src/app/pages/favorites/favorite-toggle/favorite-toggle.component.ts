import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FavoritesService } from '../../../services/favorites.service';
import { IFavoriteItem } from '../../../core/interfaces/favorite-item.interface';
import { FavoriteIconComponent } from '../../../shared/icons/favorite-icon/favorite-icon.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorite-toggle',
  imports: [FavoriteIconComponent],
  templateUrl: './favorite-toggle.component.html',
  styleUrl: './favorite-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteToggleComponent implements OnInit, OnDestroy {
  @Input() id!: number;
  @Input() media_type!: 'movie' | 'tv';
  @Input() title!: string;
  @Input() poster_path?: string;
  @Input() item!: IFavoriteItem;

  isFilled = false;
  showTooltip = false;

  isFavorite = false;
  private sub!: Subscription;

  constructor(
    private favoritesService: FavoritesService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.checkFavorite();
    this.sub = this.favoritesService.favoritesChanged$.subscribe(() => {
      this.checkFavorite();
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private checkFavorite() {
    this.isFavorite = this.favoritesService.isFavorite(
      this.id,
      this.media_type
    );
    this.isFilled = this.isFavorite;

    this.cdr.detectChanges();
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
    this.checkFavorite();
  }
}
