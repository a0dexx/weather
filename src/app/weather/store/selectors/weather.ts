import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from '../appState.interface';

import { WeatherStateInterface } from '../weatherState.interface';



export const countriesSelector = createFeatureSelector<
  AppStateInterface,
  WeatherStateInterface
  >('weather');

export const isLoadingSelector = createSelector(
  countriesSelector,
  (weatherState: WeatherStateInterface) => weatherState.isLoading
);

export const errorSelector = createSelector(
  countriesSelector,
  (weatherState: WeatherStateInterface) => weatherState.error
);

export const dataSelector = createSelector(
  countriesSelector,
  (weatherState: WeatherStateInterface) => weatherState.data
);
