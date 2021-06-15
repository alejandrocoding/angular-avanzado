import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';

import { CatsService } from '../_shared/services/cats.service';

@Injectable({
  providedIn: 'root'
})
export class CatFavsResolver implements Resolve<Observable<any[]>> {

  constructor(private readonly catsService: CatsService) { }

  resolve(): Observable<any[]> {
    return this.catsService.getFavs();
  }
}
