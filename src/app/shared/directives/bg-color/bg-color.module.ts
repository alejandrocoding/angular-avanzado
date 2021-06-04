import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BgColorDirective } from './bg-color.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [BgColorDirective],
  exports: [BgColorDirective],
})
export class BgColorModule { }
