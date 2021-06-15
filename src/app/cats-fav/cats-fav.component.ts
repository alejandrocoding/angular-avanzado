import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { CatsService } from '../_shared/services/cats.service';

@Component({
  selector: 'app-cats-fav',
  templateUrl: './cats-fav.component.html',
  styleUrls: ['./cats-fav.component.scss']
})
export class CatsFavComponent implements OnInit {

  favs: any[];
  favs$: Observable<any>;

  constructor(private route: ActivatedRoute, private readonly catsService: CatsService) {
    this.favs = this.route.snapshot.data.favs;
    this.favs$ = this.catsService.getFavs();
  }

  ngOnInit(): void { }

}
