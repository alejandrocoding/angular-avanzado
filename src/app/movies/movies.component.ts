import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MoviesService } from '../_shared/services/movies.service';
import { Movie } from '../_shared/interfaces/movie.interface';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  form!: FormGroup;

  movies: Movie[] = [];
  isLoading!: boolean;

  constructor(
    private readonly fb: FormBuilder,
    private readonly moviesService: MoviesService) { }

  ngOnInit(): void {
    this.initForm();
    this.moviesService.getAllMovies().subscribe(movies => this.movies = movies);
  }

  private initForm(): void {
    this.form = this.fb.group({
      search: '',
    });
  }
}
