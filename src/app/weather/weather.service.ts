import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  Weather } from '../model/weather';

@Injectable()
export class WeatherService {
  url = 'https://api.openweathermap.org/data/2.5/forecast';
  params = {
    q: '',
    cnt: '8',
    units: 'metric',
    APPID: '010721642521f31b0fbc8c3831d45951'
  };

  constructor(private http: HttpClient) { }

  searchWeatherForCity(city: any): Observable<Weather> {
    const urlParams: string = [
      `?q=${city}`,
      `cnt=${this.params.cnt}`,
      `units=${this.params.units}`,
      `appid=${this.params.APPID}`
    ].join('&');

    const queryUrl = `${this.url}${urlParams}`;

    return this.http.get<Weather>(queryUrl);
  }
}
