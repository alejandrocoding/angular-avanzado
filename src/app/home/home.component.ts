import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { fromEvent, Observable } from 'rxjs';
import { tap, map, concatMap, mergeMap, switchMap, exhaustMap } from 'rxjs/operators';
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
      tap(() => this.pokemon = null), // Remove latest pokemon
      map(e => (e.target as HTMLInputElement).value), // Map to get input value from event
      // concatMap, mergeMap, switchMap, exhaustMap => high order observables
      // concatMap(pokemonId => this.pokemonService.getPokemon(pokemonId)) // wait for prev stream to complete before emit new one
      // mergeMap(pokemonId => this.pokemonService.getPokemon(pokemonId)) // emit new value as soon as it comes (warning: race conditions)
      // switchMap(pokemonId => this.pokemonService.getPokemon(pokemonId)) // cancel previous stream if not completed
      exhaustMap(pokemonId => this.pokemonService.getPokemon(pokemonId)) // not emit inner obs value until prev stream finish
    );
    this.search$.subscribe(pokemon => this.pokemon = pokemon);
  }

}
