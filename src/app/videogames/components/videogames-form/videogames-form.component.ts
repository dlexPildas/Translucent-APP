import { finalize } from 'rxjs';
import { VideogamesService } from './../../services/videogames.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { hideLoadingComponentForm, showLoadingComponentForm } from 'src/app/store/app.actions';

@Component({
  selector: 'app-videogames-form',
  templateUrl: './videogames-form.component.html',
  styleUrls: ['./videogames-form.component.css']
})
export class VideogamesFormComponent implements OnInit {
  videogameForm!: FormGroup;
  consoleList = ['XBOX ONE', 'PS4', 'NINTENDO SWITCH'];

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<VideogamesFormComponent>,
    private videogameService: VideogamesService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.addOrRemoveValidatorToCompleteDate();
  }

  buildForm(): void {
    this.videogameForm = this.formBuilder.group({
      title: ['', Validators.required],
      console: ['', Validators.required],
      year: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      completed: [false, Validators.required],
      completionDate: [null],
      personalNotes: [''],
    });
  }

  addOrRemoveValidatorToCompleteDate(): void {
    this.videogameForm.get('completed')?.valueChanges.subscribe(value => {
      if (value)
        this.videogameForm.get('completionDate')?.setValidators(Validators.required)
      else
        this.videogameForm.get('completionDate')?.clearValidators()

      this.videogameForm.get('completionDate')?.updateValueAndValidity();
    });
  }

  save(): void {
    if (!this.canSave()) return;

    this.store.dispatch(showLoadingComponentForm());
    this.videogameService.save(this.videogameForm.value)
      .pipe(
        finalize(() => this.store.dispatch(hideLoadingComponentForm()))
      )
      .subscribe({
        next: () => this.snackBar.open('Videogame was save with success', '😊', { horizontalPosition: 'end', verticalPosition: 'bottom', duration: 3000 }),
        error: () => this.snackBar.open('There is an error to save the videogame', '😊', { horizontalPosition: 'end', verticalPosition: 'bottom', duration: 3000 }),
        complete: () => this.dialogRef.close(true)
      });
  }

  canSave(): boolean {
    if (!this.videogameForm.valid) {
      this.snackBar.open('There is some field(s) not valid', '☹', { horizontalPosition: 'end', verticalPosition: 'bottom' });
      return false;
    }

    if (this.videogameForm.get('completed')?.value && !this.dateOfCompleteIsValid(this.videogameForm.get('completionDate')?.value)) {
      this.snackBar.open('The Date of complete can not be greater than current date', '☹', { horizontalPosition: 'end', verticalPosition: 'bottom', duration: 3000 });
      return false;
    }

    const currentYear = (new Date()).getFullYear();
    if (+this.videogameForm.get('year')?.value > currentYear) {
      this.snackBar.open('The year can not be greater than current year', '☹', { horizontalPosition: 'end', verticalPosition: 'bottom', duration: 3000 });
      return false;
    }

    return true;
  }

  dateOfCompleteIsValid(date: string): boolean {
    const currentDate = Date.parse(new Date().toDateString());
    const completationDate = Date.parse(date);

    return completationDate <= currentDate;
  }

}
