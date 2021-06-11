import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Observable, fromEvent, merge, EMPTY } from 'rxjs';
import { debounceTime, distinctUntilChanged, exhaustMap, filter, map, tap, switchMap, catchError, finalize } from 'rxjs/operators';

import { CatsService } from '../_shared/services/cats.service';

@Component({
  selector: 'app-cats-search',
  templateUrl: './cats-search.component.html',
  styleUrls: ['./cats-search.component.scss']
})
export class CatsSearchComponent implements OnInit {

  cat$!: Observable<{ url: string }>;
  click$!: Observable<{ url: string }>;
  search$!: Observable<{ url: string }>;
  currentCatId = '';

  @ViewChild('input', { static: true }) input!: ElementRef<HTMLInputElement>;
  @ViewChild('btn', { static: true }) btn!: ElementRef<HTMLButtonElement>;

  private readonly ids = ['7r0', 'MTkyNTIwMA', 'GgmuARKFG', '9sn', '3if', 'YOD1n-Q1j', 'm1'];

  constructor(private readonly catsService: CatsService) { }

  ngOnInit(): void {
    this.search$ = fromEvent(this.input.nativeElement, 'keyup').pipe(
      map(e => (e.target as HTMLInputElement).value),
      filter(v => !!v),
      debounceTime(350),
      distinctUntilChanged(),
      switchMap(id => this.catsService.getCat(id).pipe(
        tap(cat => this.currentCatId = cat.id),
        catchError(error => {
          this.currentCatId = '';
          console.log(error);
          return EMPTY;
        })
      ))
    );

    this.click$ = fromEvent(this.btn.nativeElement, 'click').pipe(
      map(() => this.pickRandomly()),
      distinctUntilChanged(),
      tap(() => this.btn.nativeElement.disabled = true),
      debounceTime(350),
      exhaustMap(id => this.catsService.getCat(id).pipe(
        tap(cat => this.currentCatId = cat.id),
        catchError(error => {
          console.log(error);
          return EMPTY;
        }),
        finalize(() => this.btn.nativeElement.disabled = false)
      ))
    );

    this.cat$ = merge(this.search$, this.click$);
  }

  fav() {
    this.catsService.favCat(this.currentCatId).subscribe((success) => console.log(success));
  }

  private pickRandomly() {
    const length = this.ids.length;
    const index = Math.floor(Math.random() * length);
    return this.ids[index];
  }

}
