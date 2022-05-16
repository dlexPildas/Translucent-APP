import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, delay, filter, map, Observable, switchMap } from 'rxjs';

import { VideogameFiltersModel } from '../../models/videogame-filters.model';
import { DefaultObject } from './../../models/default-object.model';
import { VideogamesService } from '../../services/videogames.service';

@Component({
  selector: 'app-videogames-list-filters',
  templateUrl: './videogames-list-filters.component.html',
  styleUrls: ['./videogames-list-filters.component.css']
})
export class VideogamesListFiltersComponent implements OnInit {
  @Output() searched: EventEmitter<VideogameFiltersModel> = new EventEmitter();

  filters: VideogameFiltersModel;
  consoleList = ['ALL', 'XBOX ONE', 'PS4', 'NINTENDO SWITCH'];
  completation: DefaultObject[] = [
    { id: 0, name: 'ALL' },
    { id: 1, name: 'YES' },
    { id: 2, name: 'NO' }
  ];
  options: string[] = ['One', 'Two', 'Three'];
  titleGames!: Observable<string[]>;
  title = new FormControl();

  constructor(
    private videogamesService: VideogamesService
  ) {
    this.filters = new VideogameFiltersModel();
  }

  ngOnInit(): void {
    this.initializeAutocomplete();
  }

  initializeAutocomplete(): void {
    this.titleGames = this.title.valueChanges
    .pipe(
      delay(300),
      filter(x => x !== this.filters.title),
      debounceTime(300),
      switchMap(() => this.videogamesService.getVideogames()),
      map(value => value.filter(x => x.title.toUpperCase().includes(this.title.value?.toUpperCase()))),
      map(value => value.map(x => x.title)),
    );
  }

  search(): void {
    this.filters.title = this.title.value;
    this.searched.emit(this.filters);
  }
}
