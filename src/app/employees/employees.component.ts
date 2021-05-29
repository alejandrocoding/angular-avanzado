import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  encapsulation: ViewEncapsulation.Emulated // This is by default and recommended
})
export class EmployeesComponent implements OnInit, OnChanges {

  @Input() title!: string;
  @Input() employees!: { name: string, lastName: string }[];

  constructor() { }

  ngOnInit(): void {
    // NOT WORKING WELL! Manual listener needs to be handled/released manually too
    // window.addEventListener('keydown', (event) => {
    //   console.warn(`KEY: ${event.key}`);
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  @HostListener('window:keydown', ['$event'])
  keyDownEvt(event: KeyboardEvent) {
    console.log(`KEY PRESSED: ${event.key}`);
  }
}
