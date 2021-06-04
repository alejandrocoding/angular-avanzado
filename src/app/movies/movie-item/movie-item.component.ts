import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../shared/interfaces/movie.interface';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent implements OnInit {

  @Input() movie!: Movie;

  constructor() { }

  ngOnInit(): void { }

  applyEllipsis() {
    if (this.movie.description.length > 50) {
      this.movie.description = this.movie.description.slice(0, 50) + '...';
    }
  }

}
