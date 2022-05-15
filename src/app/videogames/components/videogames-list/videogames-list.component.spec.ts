import { VideogamesModule } from './../../videogames.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideogamesListComponent } from './videogames-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VideogameModel } from '../../models/videogame.model';

describe('VideogamesListComponent', () => {
  let component: VideogamesListComponent;
  let fixture: ComponentFixture<VideogamesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideogamesModule,  HttpClientTestingModule, BrowserAnimationsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideogamesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return a text that contains the age of the game', () => {
    let videogame: VideogameModel = {
      id: 1,
      completed: true,
      console: 'PS4',
      completionDate: new Date('01/01/2020'),
      title: 'FIFA 10',
      personalNotes: '',
      year: 2010
    };

    const howOldIsTheGame = component.howOldIsTheGame(videogame);

    expect(howOldIsTheGame).toEqual('10 years old');
  });

  it('should return a empty string when the game is not completed', () => {
    let videogame: VideogameModel = {
      id: 1,
      completed: false,
      console: 'PS4',
      completionDate: new Date('01/01/2020'),
      title: 'FIFA 10',
      personalNotes: '',
      year: 2010
    };

    const howOldIsTheGame = component.howOldIsTheGame(videogame);

    expect(howOldIsTheGame).toEqual('');
  });
});
