import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PeopleComponent } from './pages/people/people.component';

import { PersonDetailsComponent } from './pages/people/person-details/person-details.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { RegistrationComponent } from './pages/auth/registration/registration.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';



export const routes: Routes = [
    {
      path: '',
      component: MainLayoutComponent,
      children: [
        { path: '', redirectTo: 'movie', pathMatch: 'full' },
        { path: 'movie', component: HomeComponent }, 
        { path: 'details/:type/:id', component: MovieDetailsComponent },       
        { path: 'person', component: PeopleComponent },
        { path: 'person/:id', component: PersonDetailsComponent },
        { path: 'favorites', component: FavoritesComponent }
      ]
    },
    {
      path: '',
      component: AuthLayoutComponent,
      children: [
        { path: 'registration', component: RegistrationComponent },
        { path: 'login', component: LoginComponent },
        { path: '**', component: NotFoundComponent }
      ]
    }
  ];

  // { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] }