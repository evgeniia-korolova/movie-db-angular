import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PeopleComponent } from './features/people/people.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path: 'people', component: PeopleComponent}
];
