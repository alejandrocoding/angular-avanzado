import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.Emulated // This is by default and recommended
})
export class AppComponent {
  title = 'Top Employees';
  input1 = '';
  input2 = '';
  isEnabled = true;

  employees = [
    { name: 'Alex', lastName: 'Lora' },
    { name: 'Miguel', lastName: 'Campos' },
    { name: 'Gonzalo', lastName: 'Barba' },
  ];

  randomChanges(text: HTMLInputElement) {
    const randomIndex = Math.floor(Math.random() * this.employees.length);

    // Mutable way
    // Array ref no changes! not triggering ngOnChanges!
    // this.employees[randomIndex].name = randomText; 

    // Immutable way
    const employees = [...this.employees]; // shallow copy, new array ref, same objects refs
    // const employees = JSON.parse(JSON.stringify(this.employees)); // deep clone, new array and objects refs

    employees[randomIndex].name = text.value;
    text.value = '';
    this.employees = employees;
  }
}
