import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { RegistrationComponent } from './pages/auth/registration/registration.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'movie', pathMatch: 'full' },
      { path: 'movie', component: HomeComponent },
      {
        path: 'details/:type/:id',
        loadComponent: () =>
          import('./pages/movie-details/movie-details.component').then(
            (comp) => comp.MovieDetailsComponent
          ),
      },
      {
        path: 'person',
        loadComponent: () =>
          import('./pages/people/people.component').then(
            (comp) => comp.PeopleComponent
          ),
      },
      {
        path: 'person/:id',
        loadComponent: () =>
          import('./pages/people/person-details/person-details.component').then(
            (comp) => comp.PersonDetailsComponent
          ),
      },

      {
        path: 'favorites',
        loadComponent: () =>
          import('./pages/favorites/favorites.component').then(
            (comp) => comp.FavoritesComponent
          ),
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'registration',
        loadComponent: () =>
          import('./pages/auth/registration/registration.component').then(
            (comp) => comp.RegistrationComponent
          ),
      },

      {
        path: 'login',
        loadComponent: () =>
          import('./pages/auth/login/login.component').then(
            (comp) => comp.LoginComponent
          ),
      },
      { path: '**', component: NotFoundComponent },
    ],
  },
];

// { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] }
