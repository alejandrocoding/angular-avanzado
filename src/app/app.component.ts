import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isControlActive = false;
  isGroupActive = false;
  isArrayActive = true;

  activate(option: 'control' | 'group' | 'array') {
    this.isControlActive = option === 'control';
    this.isGroupActive = option === 'group';
    this.isArrayActive = option === 'array';
  }
}
