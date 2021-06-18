import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-control',
  templateUrl: './my-control.component.html',
  styleUrls: ['./my-control.component.scss']
})
export class MyControlComponent implements OnInit {

  city!: FormControl;

  constructor() { }

  ngOnInit() {
    this.city = new FormControl('', [Validators.required], []);
    // this.city = this.fb.control('', [], []);
  }
}
