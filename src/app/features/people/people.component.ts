import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-people',
  imports: [NgFor, NgIf],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',
})
export class PeopleComponent implements OnInit {
  people: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(private peopleService: PeopleService) {}

  ngOnInit() {
    this.loadPeople();
  }

  loadPeople(): void {
    this.peopleService.getPeople(this.currentPage).subscribe((data) => {
      this.people = data.results;
      this.totalPages = data.total_pages;
    });
  }

  nextPage(): void {
    this.currentPage++;
    this.loadPeople();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPeople();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  goToPage(page: any): void {
    const pageNumber = Number(page);
    if (!isNaN(pageNumber) && pageNumber !== this.currentPage) {
      this.currentPage = pageNumber;
      this.loadPeople();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getPageNumbers(): (number | string)[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const delta = 2;
    const range: (number | string)[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number = 0;

    for (let i = 1; i <= total; i++) {
      if (
        i === 1 ||
        i === total ||
        (i >= current - delta && i <= current + delta)
      ) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (Number(i) - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (Number(i) - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = Number(i);
    }

    return rangeWithDots;
  }
}
