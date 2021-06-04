import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { ResizerModule } from '../shared/directives/resizer/resizer.module';
import { BgColorModule } from '../shared/directives/bg-color/bg-color.module';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ResizerModule,
    BgColorModule
  ],
  declarations: [MoviesListComponent, MovieItemComponent],
  exports: [MoviesListComponent, MovieItemComponent],
})
export class MoviesModule { }
