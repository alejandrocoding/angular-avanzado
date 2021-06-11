import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatsSearchRoutingModule } from './cats-search-routing.module';
import { CatsSearchComponent } from './cats-search.component';

@NgModule({
  imports: [
    CommonModule,
    CatsSearchRoutingModule
  ],
  declarations: [CatsSearchComponent],
})
export class CatsSearchModule { }
