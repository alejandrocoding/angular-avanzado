import { Directive, HostBinding, Input, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appBgColor]'
})
export class BgColorDirective {
  private readonly DEFAULT_COLOR = '#eee';

  @Input('appBgColor') color = this.DEFAULT_COLOR;
  @HostBinding('style.background') backgroundColor = this.color;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.color) {
      this.backgroundColor = this.color ?? this.DEFAULT_COLOR;
    }
  }
}
