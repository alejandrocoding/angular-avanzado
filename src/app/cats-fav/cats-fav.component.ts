import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { CatsService } from '../_shared/services/cats.service';

@Component({
  selector: 'app-cats-fav',
  templateUrl: './cats-fav.component.html',
  styleUrls: ['./cats-fav.component.scss']
})
export class CatsFavComponent implements OnInit {

  favs$: Observable<any>;

  constructor(private readonly catsService: CatsService) {
    this.favs$ = this.catsService.getFavs();
  }

  ngOnInit(): void { }

}
