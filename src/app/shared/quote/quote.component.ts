import { AfterContentChecked, AfterContentInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit, AfterContentInit, AfterContentChecked {

  constructor() { }

  ngOnInit(): void {
    // debugger;
    // console.log('On Init');
  }

  ngAfterContentInit(): void {
    // Invoked once content projection is ready
    // (Called once after the first ngDoCheck())
    // debugger;
    // console.log('After content INIT');
  }

  ngAfterContentChecked(): void {
    // Invoked when the DOM tree get any change - Be careful
    // (Called after ngAfterContentInit() and every subsequent ngDoCheck())
    // debugger;
    // console.log('Content Checked');
  }
}
