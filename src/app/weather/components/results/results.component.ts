import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Weather } from '../../../model/weather';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent  {
  constructor() { }

  @Input() weather: Observable<Weather[]> ;
  @Input() error: Observable<HttpErrorResponse>;
  @Input() loading: Observable<boolean>

}


