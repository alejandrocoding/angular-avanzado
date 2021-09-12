import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { fromEvent, EMPTY, Observable, } from 'rxjs';
import { tap, map, switchMap, catchError, filter, distinctUntilChanged, debounceTime, finalize } from 'rxjs/operators';

import { PokemonService } from '../_shared/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loading = false;
  search$!: Observable<any>;

  @ViewChild('input', { static: true }) input!: ElementRef<HTMLInputElement>;

  constructor(private readonly pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.search$ = fromEvent(this.input.nativeElement, 'keyup').pipe(
      // Mapping to extract the input value
      map(e => (e.target as HTMLInputElement).value),
      // Stop stream if input is empty
      filter(value => !!value),
      // Debounce of 3Sec
      debounceTime(3000),
      // If prev value was the same than current, stop the stream
      distinctUntilChanged(),
      // Loading become true after passing the conditions to fire the request
      tap(() => this.loading = true),
      // Cancel any prev request if before it finished, user triggers new one
      switchMap(pokemonId => this.pokemonService.getPokemon(pokemonId)
        .pipe(
          // Catch possible errors due wrong input value sent to API
          catchError(error => {
            console.log('ERROR', error);
            return EMPTY;
          }),
          // Either way, turn loading to false (switch map API request finishes, higher order obs doesn't...)
          finalize(() => this.loading = false)
        )
      )
    );
  }

}
