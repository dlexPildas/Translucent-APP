import { DefaultObject } from './../../models/default-object.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { VideogameFiltersModel } from '../../models/videogame-filters.model';

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

  constructor() {
    this.filters = new VideogameFiltersModel();
  }

  ngOnInit(): void {
  }

  search(): void {
    this.searched.emit(this.filters);
  }

}
