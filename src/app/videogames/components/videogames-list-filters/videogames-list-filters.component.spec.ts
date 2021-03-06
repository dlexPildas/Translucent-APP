import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VideogamesModule } from '../../videogames.module';

import { VideogamesListFiltersComponent } from './videogames-list-filters.component';

describe('VideogamesListFiltersComponent', () => {
  let component: VideogamesListFiltersComponent;
  let fixture: ComponentFixture<VideogamesListFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideogamesModule, BrowserAnimationsModule, HttpClientTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideogamesListFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be null (filters) ', () => {
    expect(component.filters).not.toBeNull();
  });

  it('Should emit an event when (@Output searched) is called', () => {
    spyOn(component.searched, 'emit');
    component.search();
    expect(component.searched.emit).toHaveBeenCalled();
  });

  it('should display the name typed in autocomplete', fakeAsync(() => {
    component.title.setValue('Mario');

    fixture.detectChanges();
    tick(600);
    const element: HTMLInputElement = fixture.nativeElement.querySelector('.game-title');
    expect(element.value).toBe('Mario');
  }));
});
