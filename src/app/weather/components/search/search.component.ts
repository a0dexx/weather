import { Component, Output, EventEmitter } from '@angular/core';
import { WeatherService } from '../../weather.service';
import { Store } from '@ngrx/store';
import { getWeatherAction } from '../../store/actions/weather';


import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  // IMPLEMENT ANY INPUT OR OUTPUT YOU MIGHT NEED

  constructor(    private store: Store,private weatherService: WeatherService) { }

  @Output() city = new EventEmitter<string>();


  search(f: NgForm) {
    console.log(f.value.city);
    this.city.emit(f.value.city);
    f.reset();
  }



}
