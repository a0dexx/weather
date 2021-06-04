// TO BE IMPLEMENTED IF YOU DECIDE TO USE NG-RX
import { createAction, props } from '@ngrx/store';
import { Weather } from '../../../model/weather';
import { HttpErrorResponse } from '@angular/common/http';

export enum ActionTypes {
  GET_WEATHER= '[Weather] Get country feed',
  GET_WEATHER_SUCCESS = '[Weather] Get weather feed success',
  GET_WEATHER_FAILURE = '[Weather] Get weather feed failure'
}

export const getWeatherAction = createAction(
  ActionTypes.GET_WEATHER,
  props<{ city: string }>()
);

export const getWeatherSuccessAction = createAction(
  ActionTypes.GET_WEATHER_SUCCESS,
  props<{ weather: Weather }>()
);

export const getWeatherFailureAction = createAction(
  ActionTypes.GET_WEATHER_FAILURE,
  props<{errors: HttpErrorResponse}>()
);
