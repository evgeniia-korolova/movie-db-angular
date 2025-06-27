import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-favorite-icon',
  imports: [],
  templateUrl: './favorite-icon.component.html',
  styleUrl: './favorite-icon.component.scss'
})
export class FavoriteIconComponent {
  @Input() filled: boolean = false;
}
