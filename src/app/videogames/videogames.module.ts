import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { VideogamesRoutingModule } from './videogames-routing.module';
import { VideogamesListComponent } from './components/videogames-list/videogames-list.component';
import { VideogamesFormComponent } from './components/videogames-form/videogames-form.component';
import { VideogamesListFiltersComponent } from './components/videogames-list-filters/videogames-list-filters.component';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    VideogamesListComponent,
    VideogamesFormComponent,
    VideogamesListFiltersComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),

    VideogamesRoutingModule,

    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ]
})
export class VideogamesModule { }
