import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PeopleComponent } from './pages/people/people.component';
import { MoviesComponent } from './features/movies/movies.component';
import { PersonDetailsComponent } from './pages/people/person-details/person-details.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path: 'movies', component:MoviesComponent},
    {path: 'person', component: PeopleComponent},
    {path: 'person/:id', component: PersonDetailsComponent}
];
