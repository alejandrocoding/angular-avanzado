import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { EMPTY, fromEvent, Observable } from 'rxjs';
import { tap, map, switchMap, catchError, concatMap } from 'rxjs/operators';
import { PokemonService } from '../_shared/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pokemon: any;
  search$!: Observable<any>;

  @ViewChild('input', { static: true }) input!: ElementRef<HTMLInputElement>;

  constructor(private readonly pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.search$ = fromEvent(this.input.nativeElement, 'keyup').pipe(
      tap(() => this.pokemon = null),
      map(e => (e.target as HTMLInputElement).value),
      switchMap(pokemonId => this.pokemonService.getPokemon(pokemonId)
        .pipe(
          catchError(error => { // If use it on the inner observable, keep emitting...
            console.log('ERROR', error);
            return EMPTY;
          }))
      ),
      // catchError(error => { // If use it on the high order observable, stop emitting...
      //   console.log('ERROR', error);
      //   return EMPTY;
      // })
    );
    this.search$.subscribe(pokemon => this.pokemon = pokemon);
  }

}
