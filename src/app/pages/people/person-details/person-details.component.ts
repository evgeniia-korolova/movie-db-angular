import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPersonDetails } from '../../../core/models/people/person-details.model';
import { PersonDetailsService } from '../../../services/person-details.service';

@Component({
  selector: 'app-person-details',
  imports: [],
  templateUrl: './person-details.component.html',
  styleUrl: './person-details.component.scss',
})
export class PersonDetailsComponent {
  person!: IPersonDetails;
  constructor(
    private route: ActivatedRoute,
    private personDetailsService: PersonDetailsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.personDetailsService.getPersonDetails(id).subscribe((data) => {
      console.log(data);

      this.person = data;
    });
  }
}
