import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { Movie } from '../interfaces/movie.interface';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class MoviesService {

    private readonly URL: string;

    constructor(private http: HttpClient) {
        this.URL = environment.apiURL;
    }

    getMovie(id: string): Observable<Movie> {
        return this.http.get<Movie>(`${this.URL}${id}`)
    }

    getMovies(ids: string[]): Observable<Movie[]> {
        const moviesRequests = ids.map((id) => this.getMovie(id));
        return forkJoin(moviesRequests);
    }

    getAllMovies(): Observable<Movie[]> {
        return this.http.get<{ results: Movie[] }>(this.URL).pipe(map((response) => response.results));
    }

    searchMovie(name: string): Observable<Movie[]> {
        return this.http.get<{ results: Movie[] }>(`${this.URL}?search=${name}`).pipe(
            map((response) => response.results)
        );
    }
}
