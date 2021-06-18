import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isControlActive = true;
  isGroupActive = false;

  activate(option: 'control' | 'group') {
    this.isControlActive = option === 'control';
    this.isGroupActive = option === 'group';
  }
}
