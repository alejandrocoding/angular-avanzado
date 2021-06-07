import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { PokemonService } from '../_shared/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pokemon: any;

  @ViewChild('input', { static: true }) input!: ElementRef<HTMLInputElement>;

  constructor(private readonly pokemonService: PokemonService) { }

  async ngOnInit(): Promise<void> {

    const pokemon1 = await this.pokemonService.getPokemon('1').toPromise();

    try {
      const pokemon2 = await this.pokemonService.getPokemon('yo').toPromise();
      console.log(pokemon2);
    } catch (error) {
      console.log('ERROR', error);
    }

    this.pokemon = pokemon1;
    console.log(pokemon1);
  }
}
