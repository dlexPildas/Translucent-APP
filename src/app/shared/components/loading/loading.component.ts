import { IAppState } from './../../../store/app.reducers';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  isLoading$!: Observable<boolean>;

  constructor(
    private store: Store<{ app: IAppState}>
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select('app')
      .pipe(
        map(x => x.loading)
      )
  }

}
