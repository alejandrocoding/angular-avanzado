import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatsService {

  private readonly url = environment.url;
  private readonly SUB_ID = 'ialex90';

  constructor(private readonly http: HttpClient) { }

  getCat(id: string) {
    return this.http.get<any>(`${this.url}/images/${id}`);
  }

  favCat(id: string) {
    const body = { image_id: id, sub_id: this.SUB_ID };
    return this.http.post<any>(`${this.url}/favourites`, body, { params: { sub_id: this.SUB_ID } });
  }

  getFavs() {
    return this.http.get<any[]>(`${this.url}/favourites/`, { params: { sub_id: this.SUB_ID } });
  }

}
