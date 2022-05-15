import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { VideogameModel } from './../../models/videogame.model';
import { VideogamesService } from '../../services/videogames.service';
import { VideogamesFormComponent } from '../videogames-form/videogames-form.component';
import { VideogameFiltersModel } from '../../models/videogame-filters.model';

@Component({
  selector: 'app-videogames-list',
  templateUrl: './videogames-list.component.html',
  styleUrls: ['./videogames-list.component.css']
})
export class VideogamesListComponent implements OnInit {
  videogames!: VideogameModel[];

  constructor(
    public dialog: MatDialog,
    private videogamesService: VideogamesService
    ) {
  }

  ngOnInit(): void {
    this.getVideogames();
  }

  getVideogames(filters?: VideogameFiltersModel): void {
    this.videogamesService.getVideogames(filters)
      .subscribe(videogames => this.videogames = videogames)
  }

  openDialogAddNewVideogame(): void {
    this.dialog.open(VideogamesFormComponent)
      .afterClosed()
      .subscribe(value => {
        if (value) this.getVideogames();
      });
  }

  howOldIsTheGame(game: VideogameModel): string {
    if (!game.completed) return '';

    const yearOfCompletation = (new Date(game.completionDate)).getFullYear();

    return `${(+yearOfCompletation) - (+game.year)} years old`;
  }

}
