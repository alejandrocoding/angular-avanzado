import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatsFavComponent } from './cats-fav.component';

const routes: Routes = [
  { path: '', component: CatsFavComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatsFavRoutingModule { }
