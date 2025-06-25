import { Component, Input } from '@angular/core';
import { IPersonListItem } from '../../../core/interfaces/people/person.interface';

@Component({
  selector: 'app-person-card',
  imports: [],
  templateUrl: './person-card.component.html',
  styleUrl: './person-card.component.scss'
})
export class PersonCardComponent {
  @Input() person!: IPersonListItem;

  getProfileImage(): string {
    return this.person.profile_path
      ? `https://image.tmdb.org/t/p/w300${this.person.profile_path}`
      : 'user-profile-img.svg';
  }
}
