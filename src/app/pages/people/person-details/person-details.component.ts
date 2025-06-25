import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonDetailsService } from '../../../services/people/person-details.service';
import { IPersonDetails } from '../../../core/interfaces/people/person.interface';
import { IKnownForItem } from '../../../core/interfaces/people/known-for-item.interface';
import { KnownForService } from '../../../services/people/known-for.service';

@Component({
  selector: 'app-person-details',
  imports: [],
  templateUrl: './person-details.component.html',
  styleUrl: './person-details.component.scss',
})
export class PersonDetailsComponent {
  person!: IPersonDetails;
  isBioExpanded = false;
  imageUrl = 'https://image.tmdb.org/t/p/w500';
  fallback = 'user-profile-img.svg';
  knownFor: IKnownForItem[] = [];

  knownForService = inject(KnownForService)

  constructor(
    private route: ActivatedRoute,
    private personDetailsService: PersonDetailsService
    
  ) {}

  getGender(code: number): string {
    switch (code) {
      case 1:
        return 'Female';
      case 2:
        return 'Male';
      default:
        return '—';
    }
  }

  

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.personDetailsService.getPersonDetails(id).subscribe((data) => {
      console.log(data);

      this.person = data;
    });

    this.knownForService.getKnownFor(id).subscribe((data) => {
      this.knownFor = data
    })
  }
}
