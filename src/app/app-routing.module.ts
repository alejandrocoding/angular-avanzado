import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CatFavsResolver } from './_core/cats-favs.resolver';

const routes: Routes = [
  {
    path: 'search',
    loadChildren: () => import('./cats-search/cats-search.module').then(m => m.CatsSearchModule),
  },
  {
    path: 'fav',
    loadChildren: () => import('./cats-fav/cats-fav.module').then(m => m.CatsFavModule),
    // canActivate: [TokenGuard],
    // canLoad: [TokenGuard],
    resolve: {
      favs: CatFavsResolver
    }
  },
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: '**', redirectTo: '/search', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
