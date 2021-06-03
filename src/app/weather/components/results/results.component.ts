import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Weather } from '../../../model/weather';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnChanges, OnInit {
  constructor() { }

  @Input() weather: Observable<Weather[]> ;
  @Input() error: Observable<HttpErrorResponse>;
  @Input() loading: Observable<boolean>

  ngOnInit(){


  }




  ngOnChanges() {
    // IMPLEMENT ANYTHING YOU BEKIEVE YOU MIGHT NEED HERE
    console.log('hiu')
    console.log(this.weather);
  }
}


