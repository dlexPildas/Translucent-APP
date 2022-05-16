import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { VideogameFiltersModel } from '../models/videogame-filters.model';
import { VideogameModel } from '../models/videogame.model';
import { VideogamesService } from './videogames.service';


describe('VideogamesService', () => {
  let service: VideogamesService;
  let http: HttpClient;
  let videoGames: VideogameModel[];
  let filters: VideogameFiltersModel;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(VideogamesService);
    http = TestBed.inject(HttpClient);
    videoGames = [
      {
        id: 1,
        title: "Metal Gear Solid 2",
        console: "PS4",
        year: 2001,
        completed: true,
        completionDate: new Date('07/08/2017'),
        personalNotes: "I really liked this game. Kojima really nailed here."
      },
      {
        id: 2,
        title: "Mario",
        console: "PS4",
        year: 2011,
        completed: false,
        personalNotes: "",
      }
    ];
    filters = new VideogameFiltersModel();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be call endpoint to return a list', () => {
    spyOn(http, 'get').and.callThrough();

    service.getVideogames();

    expect(http.get).toHaveBeenCalled()
  });

  it('should be call endpoint to save a new videogame', () => {
    spyOn(http, 'post').and.callThrough();

    service.save({} as VideogameModel);

    expect(http.post).toHaveBeenCalled()
  });

  it('should return all videogames (2) when filters is null', () => {
    const result = service.filterVideoGames(videoGames);

    expect(result).toHaveSize(2);
  });

  it('should return only a videogame with title equals to: [Metal Gear Solid 2] ', () => {
    filters.title = 'Metal Gear Solid 2';

    const result = service.filterVideoGames(videoGames, filters);

    expect(result).toHaveSize(1);
    expect(result[0].title).toBe('Metal Gear Solid 2');
  });

  it('should return two videogames by console equals to: [PS4] ', () => {
    filters.console = 'PS4';

    const result = service.filterVideoGames(videoGames, filters);

    expect(result).toHaveSize(2);
    expect(result[0].console).toBe('PS4');
    expect(result[0].console).toBe('PS4');
  });

  it('should return only a videogame that was completed', () => {
    filters.completation = 1;

    const result = service.filterVideoGames(videoGames, filters);

    expect(result).toHaveSize(1);
  });

  it('should return only a videogame that filter completed is equals to 1 [not completed]', () => {
    filters.completation = 2;

    const result = service.filterVideoGames(videoGames, filters);

    expect(result).toHaveSize(1);
  });

  it('should return all videogames (two) that filter completed is equals to 0 [all]', () => {
    filters.completation = 0;

    const result = service.filterVideoGames(videoGames, filters);

    expect(result).toHaveSize(2);
  });

  it('should return only a videogame that filter year is equals to 2011', () => {
    filters.year = 2011;

    const result = service.filterVideoGames(videoGames, filters);

    expect(result).toHaveSize(1);
  });

  it('shouldnt return no one videogame when year, console or title filters were not equals to values returned', () => {
    filters.year = 2011;
    filters.console = 'PS2';
    filters.title = 'FIFA 12';

    const result = service.filterVideoGames(videoGames, filters);

    expect(result).toHaveSize(0);
  });
});
