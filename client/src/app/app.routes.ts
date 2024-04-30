import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { Error404Component } from './pages/error-404/error-404.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home - Shoesx',
  },
  {
    path: 'about',
    component: AboutUsComponent,
    title: 'About - Shoesx',
  },
  {
    path: '**',
    component: Error404Component,
    title: 'Error 404 - Page not found - Shoesx',
  },
];
