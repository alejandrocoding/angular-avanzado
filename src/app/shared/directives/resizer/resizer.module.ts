import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizerDirective } from './resizer.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ResizerDirective],
  exports: [ResizerDirective],
})
export class ResizerModule { }
