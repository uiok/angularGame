import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/indexController'
import { HomeComponent } from './components/home/homeController'
const appRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  {
    path: 'index', component: IndexComponent,
    children: [
      { path: '', redirectTo: 'game', pathMatch: 'full' },
      { path: 'game', component: HomeComponent }
    ]
  }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: false });
