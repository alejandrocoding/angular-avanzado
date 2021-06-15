import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatsSearchComponent } from './cats-search.component';

const routes: Routes = [
  { path: '', component: CatsSearchComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatsSearchRoutingModule { }
