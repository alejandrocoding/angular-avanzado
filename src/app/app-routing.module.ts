import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CatsSearchComponent } from './cats-search/cats-search.component';
import { CatsFavComponent } from './cats-fav/cats-fav.component';

const routes: Routes = [
  { path: 'search', component: CatsSearchComponent },
  { path: 'fav', component: CatsFavComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: '**', redirectTo: '/search', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
