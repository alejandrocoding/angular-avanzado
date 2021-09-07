import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appAnimatedInput]'
})
export class AnimatedInputDirective {

    private readonly default = [
        'darksalmon', 'hotpink', 'lightskyblue', 'goldenrod', 'peachpuff',
        'mediumspringgreen', 'cornflowerblue', 'blanchedalmond', 'lightslategrey'
    ];

    @Input() private colors: string[] = this.default;

    @HostBinding('style.color') color!: string;
    @HostBinding('style.border-color') borderColor!: string;
    @HostBinding('class.animated-input') animation = true;

    constructor(private el: ElementRef) { }

    @HostListener('keydown') newColor() {
        const colorPick = Math.floor(Math.random() * this.colors.length);
        this.color = this.borderColor = this.colors[colorPick];
    }

    @HostListener('contextmenu', ['$event']) onClick(e: MouseEvent) {
        e.preventDefault();
        this.input.select();
        document.execCommand('copy');
        console.log('Value copied!', this.value);
    }

    get input() {
        return this.el.nativeElement as HTMLInputElement;
    }

    get value() {
        return this.input.value;
    }
}
