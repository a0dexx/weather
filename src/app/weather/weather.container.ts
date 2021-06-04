import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { dataSelector, errorSelector, isLoadingSelector } from './store/selectors/weather';
import { Weather } from '../model/weather';
import { getWeatherAction } from './store/actions/weather';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  template: `
    <app-search (city)="citySearch($event)"></app-search>
    <app-results [weather]="results$" [error]="error$" [loading]="loading$"></app-results>
  `
})
export class WeatherContainer implements OnInit {

  constructor(public store: Store) {
  }

  results$: Observable<Weather[]>;
  error$: Observable<HttpErrorResponse>;
  loading$: Observable<boolean>;

  ngOnInit() {
    this.results$ = this.store.pipe(select(dataSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.loading$ = this.store.pipe(select(isLoadingSelector));
  }

  citySearch(searchString: string) {
    this.store.dispatch(getWeatherAction({ city: searchString }));
  }
}
