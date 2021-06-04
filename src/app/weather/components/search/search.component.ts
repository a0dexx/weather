import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  // IMPLEMENT ANY INPUT OR OUTPUT YOU MIGHT NEED
  constructor(private fb: FormBuilder) {
  }

  @Output() city = new EventEmitter<string>();
  form: FormGroup

  ngOnInit() {
    this.form = this.fb.group({
      city: ['', [Validators.required]]
    });
  }

  search() {
    this.city.emit(this.form.value.city);
    this.form.reset();
  }
}
