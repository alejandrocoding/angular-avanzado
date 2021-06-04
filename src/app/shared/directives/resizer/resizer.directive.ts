import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appResizer]'
})
export class ResizerDirective {

  @Output() resizeEvt = new EventEmitter<void>();

  @HostListener('window:resize') onResize() {
    this.resizeEvt.emit();
  }
}
