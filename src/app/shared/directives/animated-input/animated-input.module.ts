import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimatedInputDirective } from './animated-input.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [AnimatedInputDirective],
  exports: [AnimatedInputDirective]
})
export class AnimatedInputModule { }
