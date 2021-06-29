import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyGroupComponent } from './my-group.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MyGroupComponent],
  exports: [MyGroupComponent],
})
export class MyGroupModule { }
