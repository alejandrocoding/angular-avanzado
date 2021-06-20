import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { Character } from '../interfaces/character.interface';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class CharactersService {

    private readonly URL: string;

    constructor(private http: HttpClient) {
        this.URL = environment.apiURL;
    }

    getCharacter(id: string): Observable<Character> {
        return this.http.get<Character>(`${this.URL}${id}`)
    }

    getCharacters(ids: string[]): Observable<Character[]> {
        const characterRequests = ids.map((id) => this.getCharacter(id));
        return forkJoin(characterRequests);
    }

    getAllCharacters(): Observable<Character[]> {
        return this.http.get<{ results: Character[] }>(this.URL).pipe(map((response) => response.results));
    }

    searchCharacter(name: string): Observable<Character[]> {
        return this.http.get<{ results: Character[] }>(`${this.URL}?search=${name}`).pipe(
            map((response) => response.results)
        );
    }
}
