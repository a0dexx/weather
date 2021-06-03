import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SearchComponent } from './search.component';

import Spy = jasmine.Spy;
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { WeatherService } from '../../weather.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  let store: MockStore;
  const initialState = {
    isLoading: false,
    error: null,
    data: [],
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        provideMockStore({ initialState }),
        WeatherService,
        FormBuilder
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // IMPLEMENT TESTS HERE

  it('should create the form', () => {
    expect(component.form).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('city field invalid when empty', () => {
    let city = component.form.controls['city'];
    expect(city.valid).toBeFalsy();
  });

  it('email field validity. invalid when no input', () => {
    let errors = {};
    let city = component.form.controls['city'];
    errors = city.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('email field validity. valid when input', () => {
    let errors = {};
    let city = component.form.controls['city'];
    city.setValue('London');
    errors = city.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('submitting a form emits a city', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls['city'].setValue("london");
    expect(component.form.valid).toBeTruthy();
    let city;
    // Subscribe to the Observable and store the user in a local variable.
    component.city.subscribe((value) => {
      city = value;
    });
    // Trigger the search function
    component.search();

    // Now we can check to make sure the emitted value is correct
    expect(city).toBe("london");
  });
});
