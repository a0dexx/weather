import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import {GetWeatherEffect} from './weather';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { getWeatherAction, getWeatherSuccessAction, getWeatherFailureAction, ActionTypes } from '../actions/weather';
import { TestScheduler } from 'rxjs/testing';
import {WeatherService} from '../../weather.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

describe('GetWeatherEffect', () => {
  const initialState = { shows: [] };
  const weatherService = jasmine.createSpyObj('weatherService', [
    'searchWeatherForCity'
  ]);
  let effects: GetWeatherEffect;
  let actions: Observable<any>;
  let store: MockStore<any>;
  let testScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetWeatherEffect,
        provideMockStore({ initialState }),
        provideMockActions(() => actions),
        { provide: WeatherService, useValue: weatherService }
      ]
    });

    effects = TestBed.inject(GetWeatherEffect);
    store = TestBed.inject(MockStore);
    store.setState({});

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('getWeather$', () => {
    it('should handle appLoaded and return a getWeatherSuccessAction action', () => {
      const mockWeather = {"cod":"200","message":0,"cnt":8,"list":[{"dt":1622764800,"main":{"temp":18.83,"feels_like":19.14,"temp_min":17.36,"temp_max":18.83,"pressure":1010,"sea_level":1010,"grnd_level":1003,"humidity":91,"temp_kf":1.47},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":93},"wind":{"speed":1.72,"deg":218,"gust":2.96},"visibility":10000,"pop":0.51,"rain":{"3h":0.12},"sys":{"pod":"d"},"dt_txt":"2021-06-04 00:00:00"},{"dt":1622775600,"main":{"temp":17.19,"feels_like":17.45,"temp_min":16,"temp_max":17.19,"pressure":1009,"sea_level":1009,"grnd_level":1003,"humidity":95,"temp_kf":1.19},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"clouds":{"all":97},"wind":{"speed":2.39,"deg":209,"gust":8.19},"visibility":10000,"pop":0,"sys":{"pod":"n"},"dt_txt":"2021-06-04 03:00:00"},{"dt":1622786400,"main":{"temp":15.48,"feels_like":15.64,"temp_min":15.48,"temp_max":15.48,"pressure":1010,"sea_level":1010,"grnd_level":1003,"humidity":98,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"clouds":{"all":100},"wind":{"speed":3.33,"deg":223,"gust":9.88},"visibility":10000,"pop":0,"sys":{"pod":"n"},"dt_txt":"2021-06-04 06:00:00"},{"dt":1622797200,"main":{"temp":14.85,"feels_like":14.98,"temp_min":14.85,"temp_max":14.85,"pressure":1009,"sea_level":1009,"grnd_level":1003,"humidity":99,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"clouds":{"all":100},"wind":{"speed":3.05,"deg":236,"gust":9.14},"visibility":10000,"pop":0.16,"sys":{"pod":"n"},"dt_txt":"2021-06-04 09:00:00"},{"dt":1622808000,"main":{"temp":17.07,"feels_like":17.29,"temp_min":17.07,"temp_max":17.07,"pressure":1010,"sea_level":1010,"grnd_level":1004,"humidity":94,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"clouds":{"all":83},"wind":{"speed":3.81,"deg":223,"gust":6.27},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2021-06-04 12:00:00"},{"dt":1622818800,"main":{"temp":20.6,"feels_like":20.7,"temp_min":20.6,"temp_max":20.6,"pressure":1010,"sea_level":1010,"grnd_level":1004,"humidity":76,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"clouds":{"all":90},"wind":{"speed":4.06,"deg":242,"gust":6.02},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2021-06-04 15:00:00"},{"dt":1622829600,"main":{"temp":19.88,"feels_like":20.01,"temp_min":19.88,"temp_max":19.88,"pressure":1009,"sea_level":1009,"grnd_level":1003,"humidity":80,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"clouds":{"all":92},"wind":{"speed":2.05,"deg":261,"gust":4.86},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2021-06-04 18:00:00"},{"dt":1622840400,"main":{"temp":25.37,"feels_like":25.45,"temp_min":25.37,"temp_max":25.37,"pressure":1008,"sea_level":1008,"grnd_level":1002,"humidity":57,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"clouds":{"all":60},"wind":{"speed":4.29,"deg":244,"gust":5.92},"visibility":10000,"pop":0.08,"sys":{"pod":"d"},"dt_txt":"2021-06-04 21:00:00"}],"city":{"id":5928065,"name":"Cornwall","coord":{"lat":45.0181,"lon":-74.7281},"country":"CA","population":48821,"timezone":-14400,"sunrise":1622711666,"sunset":1622767208}};
      const action = getWeatherAction({city:'berlin'});
      const outcome = getWeatherSuccessAction({ weather: mockWeather });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });
        const response = cold('-b|', { b: mockWeather });
        weatherService.searchWeatherForCity.and.returnValue(response);
        expectObservable(effects.getWeather$).toBe('--b', { b: outcome });
      });
    });
  });
  //
  // describe('getWeather$', () => {
  //   it('should handle appLoaded and return a getWeatherFailureAction action', () => {
  //     const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  //     const mockError =new HttpErrorResponse ({
  //         headers: headers,
  //         status: 400,
  //         statusText: "Bad Request",
  //         url: "https://api.openweathermap.org/data/2.5/forecast?q=&cnt=8&units=metric&appid=010721642521f31b0fbc8c3831d45951",
  //         error: {
  //           "cod": "400",
  //           "message": "Nothing to geocode"
  //         }});
  //     const action = getWeatherAction({city:'kkk'});
  //     const outcome = getWeatherFailureAction({ errors: mockError });
  //
  //     testScheduler.run(({ hot, cold, expectObservable }) => {
  //       actions = hot('-a', { a: action });
  //       const response = cold('-b|', { b: mockError });
  //       weatherService.searchWeatherForCity.and.returnValue(response);
  //       expectObservable(effects.getWeather$).toBe('--b', { b: outcome });
  //     });
  //   });
  // });

});
