import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { finalize, Observable } from 'rxjs';

import { VideogameModel } from './../../models/videogame.model';
import { VideogamesService } from '../../services/videogames.service';
import { VideogamesFormComponent } from '../videogames-form/videogames-form.component';
import { VideogameFiltersModel } from '../../models/videogame-filters.model';
import { hideLoadingComponent, showLoadingComponent } from 'src/app/store/app.actions';

@Component({
  selector: 'app-videogames-list',
  templateUrl: './videogames-list.component.html',
  styleUrls: ['./videogames-list.component.css']
})
export class VideogamesListComponent implements OnInit {
  videogames$!: Observable<VideogameModel[]>;

  constructor(
    public dialog: MatDialog,
    private videogamesService: VideogamesService,
    private store: Store
  ) {
  }

  ngOnInit(): void {
    this.getVideogames();
  }

  getVideogames(filters?: VideogameFiltersModel): void {
    this.store.dispatch(showLoadingComponent());
    this.videogames$ = this.videogamesService
      .getVideogames(filters)
      .pipe(
        finalize(() => this.store.dispatch(hideLoadingComponent()))
      );
  }

  openDialogAddNewVideogame(): void {
    this.dialog.open(VideogamesFormComponent)
      .afterClosed()
      .subscribe(value => {
        if (value) this.getVideogames();
      });
  }

  howOldIsTheGame(game: VideogameModel): string {
    if (!game.completed || !game.completionDate) return '';

    const yearOfCompletation = (new Date(game.completionDate || '')).getFullYear();

    return `${(+yearOfCompletation) - (+game.year)} years old`;
  }

}
