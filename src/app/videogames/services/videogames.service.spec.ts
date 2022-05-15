import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { VideogamesService } from './videogames.service';

describe('VideogamesService', () => {
  let service: VideogamesService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(VideogamesService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be call endpoint to return a list', () => {
    spyOn(http, 'get').and.callThrough();

    service.getVideogames();

    expect(http.get).toHaveBeenCalled()
  });
});
