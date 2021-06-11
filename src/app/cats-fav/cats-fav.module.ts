import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatsFavRoutingModule } from './cats-fav-routing.module';
import { CatsFavComponent } from './cats-fav.component';

@NgModule({
  imports: [
    CommonModule,
    CatsFavRoutingModule
  ],
  declarations: [CatsFavComponent],
})
export class CatsFavModule { }
