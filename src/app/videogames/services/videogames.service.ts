import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { VideogameModel } from './../models/videogame.model';
import { VideogameFiltersModel } from '../models/videogame-filters.model';

@Injectable({
  providedIn: 'root'
})
export class VideogamesService {
  private readonly apiUrl = 'http://localhost:3000/videogames';

  constructor(private http: HttpClient) { }

  getVideogames(filters?: VideogameFiltersModel): Observable<VideogameModel[]> {
    return this.http.get<VideogameModel[]>(this.apiUrl)
      .pipe(
        map(videogames => {
          if(!filters) return videogames;

          if (filters?.console !== 'ALL') {
            videogames = videogames.filter(x => filters?.console.includes(x.console))
          }

          if (filters?.completation !== 0) {
            videogames = videogames.filter(x => filters.completation === 1 ? x.completed : !x.completed)
          }

          return videogames;
        })
      );
  }

  save(videogame: VideogameModel) {
    return this.http.post(this.apiUrl, videogame);
  }
}
