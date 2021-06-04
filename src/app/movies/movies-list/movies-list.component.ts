import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';

import { movies_500 } from '../../shared/constants/movies.const';
import { Movie } from '../../shared/interfaces/movie.interface';
import { MovieItemComponent } from '../movie-item/movie-item.component';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  movies: Movie[] = movies_500;

  @ViewChildren('movieItems') movieItems!: QueryList<MovieItemComponent>;

  constructor() { }

  ngOnInit(): void { }

  onResize() {
    this.movieItems?.forEach(movie => movie.applyEllipsis());
  }

}
