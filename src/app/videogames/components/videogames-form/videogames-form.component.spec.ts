import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef } from '@angular/material/dialog';

import { VideogamesFormComponent } from './videogames-form.component';
import { VideogamesModule } from '../../videogames.module';
import { appReducer } from 'src/app/store/app.reducers';
import { StoreModule } from '@ngrx/store';

describe('VideogamesFormComponent', () => {
  let component: VideogamesFormComponent;
  let fixture: ComponentFixture<VideogamesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        VideogamesModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        StoreModule.forRoot({ app: appReducer }),
      ],
      providers: [
        {
          provide: MatDialogRef, useValue: MatDialogRef
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideogamesFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create a formGroup', () => {
    fixture.detectChanges();
    expect(component.videogameForm).toBeTruthy();
  });

  it('should return false when date is greater than current date', () => {
    const date = (new Date('01/01/2023')).toDateString();

    expect(component.dateOfCompleteIsValid(date)).toBeFalse();
  });

  it('should return true when date is not greater than current date', () => {
    const date = (new Date()).toDateString();

    expect(component.dateOfCompleteIsValid(date)).toBeTrue();
  });

  it('Field (FormControl completionDate) should have validator required  when value (FormControl completed) is true', () => {
    fixture.detectChanges();
    component.videogameForm.get('completed')?.setValue(true);

    expect(component.videogameForm.get('completionDate')?.hasValidator(Validators.required)).toBeTrue();
  });

  it('Field (FormControl completionDate) should havent validator required when value (FormControl completed) is false', () => {
    fixture.detectChanges();
    component.videogameForm.get('completed')?.setValue(true);

    expect(component.videogameForm.get('completionDate')?.hasValidator(Validators.required)).toBeTrue();
  });

  it('Should be false when (FormGroup videogameForm) is not valid', () => {
    fixture.detectChanges();

    component.videogameForm.setValue({
      title: 'Test',
      console: null,
      year: null,
      completed: true,
      completionDate: (new Date()).toDateString(),
      personalNotes: '',
    });

    expect(component.canSave()).toBeFalse();
  });

  it('Should be false when (FormControl completionDate) is greater than current date', () => {
    fixture.detectChanges();

    component.videogameForm.setValue({
      title: 'Test',
      console: 'PS2',
      year: 2001,
      completed: true,
      completionDate: (new Date('01/01/2023')).toDateString(),
      personalNotes: '',
    });

    expect(component.canSave()).toBeFalse();
  });

  it('Should be true when (FormControl completionDate) is greater than current date and (FormControl completed) is false', () => {
    fixture.detectChanges();

    component.videogameForm.setValue({
      title: 'Test',
      console: 'PS2',
      year: 2001,
      completed: false,
      completionDate: (new Date('01/01/2023')).toDateString(),
      personalNotes: '',
    });

    expect(component.canSave()).toBeTrue();
  });

  it('Should be false when (FormControl year) is greater than current year', () => {
    fixture.detectChanges();

    component.videogameForm.setValue({
      title: 'Test',
      console: 'PS2',
      year: 20010,
      completed: true,
      completionDate: (new Date('01/01/2021')).toDateString(),
      personalNotes: '',
    });

    expect(component.canSave()).toBeFalse();
  });

  it('Should be true when (FormGroup videogameForm) is valid', () => {
    fixture.detectChanges();

    component.videogameForm.setValue({
      title: 'Test',
      console: 'PS2',
      year: 2010,
      completed: true,
      completionDate: (new Date('01/01/2021')).toDateString(),
      personalNotes: '',
    });

    expect(component.canSave()).toBeTrue();
  });
});
