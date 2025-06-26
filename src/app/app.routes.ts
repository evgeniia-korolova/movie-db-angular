import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PeopleComponent } from './pages/people/people.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { PersonDetailsComponent } from './pages/people/person-details/person-details.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';

// export const routes: Routes = [
//     {path:'', component: HomeComponent},
//     {path: 'movies', component:MoviesComponent},
//     {path: 'person', component: PeopleComponent},
//     {path: 'person/:id', component: PersonDetailsComponent}
// ];

export const routes: Routes = [
    {
      path: '',
      component: MainLayoutComponent,
      children: [
        { path: '', component: HomeComponent },
        { path: 'movies', component: MoviesComponent },
        { path: 'person', component: PeopleComponent },
        { path: 'person/:id', component: PersonDetailsComponent },
      ]
    },
    {
      path: '',
      component: AuthLayoutComponent,
      children: [
        { path: 'login', component: LoginComponent },
        { path: '**', component: NotFoundComponent }
      ]
    }
  ];