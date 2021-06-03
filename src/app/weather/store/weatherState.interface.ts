import { Weather } from '../../model/weather';
import { HttpErrorResponse } from '@angular/common/http';

export interface WeatherStateInterface {
  isLoading: boolean;
  error: HttpErrorResponse | null;
  data: Weather[] | null;
}
