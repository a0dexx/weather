import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import {
  getWeatherAction,
  getWeatherSuccessAction,
  getWeatherFailureAction,
} from '../actions/weather';

import { WeatherService } from '../../weather.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GetWeatherEffect {
  constructor(
    private actions$: Actions,
    private weatherService: WeatherService
  ) { }

  getWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getWeatherAction),
      switchMap(({ city }) => {
        return this.weatherService.searchWeatherForCity(city).pipe(
          map((weather) => {
            return getWeatherSuccessAction({ weather });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(getWeatherFailureAction({errors: errorResponse}));
          })
        );
      })
    )
  );
}

