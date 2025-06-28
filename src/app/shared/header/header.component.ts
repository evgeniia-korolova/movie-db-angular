import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { FavoriteIconComponent } from '../icons/favorite-icon/favorite-icon.component';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, FavoriteIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  hasFavorites!: boolean;

  constructor(
    public authService: AuthService,
    private router: Router,
    private favoritesService: FavoritesService,
    private cd: ChangeDetectorRef
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/movie']);
  }

  ngOnInit() {
    // this.hasFavorites = this.favoritesService.getFavorites().length > 0;
    // this.favoritesService.favoritesChanged$.subscribe(() => {
    //   this.hasFavorites = this.favoritesService.getFavorites().length > 0;
    //   this.cd.detectChanges();
    // });
    this.favoritesService.favoritesChanged$.subscribe((items) => {
      this.hasFavorites = items.length > 0;
    });


  }
}
