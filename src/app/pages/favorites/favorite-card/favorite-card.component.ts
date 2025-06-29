import { Component, inject, Input } from '@angular/core';
import { IFavoriteItem } from '../../../core/interfaces/favorite-item.interface';

import { RouterLink } from '@angular/router';
import { FavoriteToggleComponent } from '../favorite-toggle/favorite-toggle.component';

@Component({
  selector: 'app-favorite-card',
  imports: [RouterLink, FavoriteToggleComponent],
  templateUrl: './favorite-card.component.html',
  styleUrl: './favorite-card.component.scss',
})
export class FavoriteCardComponent {
  @Input() item!: IFavoriteItem;
}
