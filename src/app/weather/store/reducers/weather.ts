
import { WeatherStateInterface } from '../weatherState.interface';
import { Action, createReducer, on } from '@ngrx/store';
import {
  getWeatherAction,
  getWeatherSuccessAction,
  getWeatherFailureAction,
} from '../actions/weather';
 import { routerNavigationAction } from '@ngrx/router-store';

const initialState: WeatherStateInterface = {
  isLoading: false,
  error: null,
  data: [],
};

export const weatherReducer = createReducer(
  initialState,
  on(
    getWeatherAction,
    (state): WeatherStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getWeatherSuccessAction,
    (state, action): WeatherStateInterface => ({
      ...state,
      isLoading: false,
      data: [...state.data, action.weather],
      error:null
    })
  ),
  on(
    getWeatherFailureAction,
    (state,action): WeatherStateInterface => ({
      ...state,
      isLoading: false,
      error: action.errors
    })
  ),
   on(routerNavigationAction, (): WeatherStateInterface => initialState),
);

export function reducers(state: WeatherStateInterface|undefined, action: Action) {
  return weatherReducer(state, action);
}
