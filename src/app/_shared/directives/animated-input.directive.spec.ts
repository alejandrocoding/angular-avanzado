import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { AnimatedInputDirective } from "./animated-input.directive";

describe('AnimatedInputDirective', () => {

    let fixtureNoInput: ComponentFixture<TestNoInputComponent>;
    let fixtureInput: ComponentFixture<TestInputComponent>;

    let directiveNoInputDebug: DebugElement;
    let directiveInputDebug: DebugElement;

    let directiveNoInput: AnimatedInputDirective;
    let directiveInput: AnimatedInputDirective;

    @Component({
        template: `
            <h1>Hello from Test Component</h1>
            <input type="text" appAnimatedInput>
        `
    })
    class TestNoInputComponent { }

    @Component({
        template: `
            <h1>Hello from Test Component</h1>
            <input type="text" appAnimatedInput [colors]="colors">
        `
    })
    class TestInputComponent {
        colors = ['red'];
    }

    beforeEach(() => {
        const _fixture = TestBed.configureTestingModule({
            declarations: [TestNoInputComponent, TestInputComponent, AnimatedInputDirective]
        });
        fixtureNoInput = _fixture.createComponent(TestNoInputComponent);
        fixtureInput = _fixture.createComponent(TestInputComponent);

        fixtureNoInput.detectChanges();
        fixtureInput.detectChanges();

        directiveNoInputDebug = fixtureNoInput.debugElement.query(By.directive(AnimatedInputDirective));
        directiveInputDebug = fixtureInput.debugElement.query(By.directive(AnimatedInputDirective));

        directiveNoInput = directiveNoInputDebug.injector.get(AnimatedInputDirective);
        directiveInput = directiveInputDebug.injector.get(AnimatedInputDirective);
    });

    it('should be used in a input element', () => {
        expect(directiveInputDebug.name).toBe('input');
        expect(directiveNoInputDebug.name).toBe('input');
    });

    it('should change color & borderColor and match colors after keydown event on its input field', () => {
        directiveNoInput.input.value = '1';
        const event = new Event('keydown', {} as any);
        directiveNoInput.input.dispatchEvent(event);
        fixtureNoInput.detectChanges();

        const color = directiveNoInputDebug.nativeElement.style.color;
        const borderColor = directiveNoInputDebug.nativeElement.style.borderColor;

        expect(color).toBe(borderColor);
    });

    it('should change color & borderColor and use default colors when no input colors is passed in', () => {
        directiveNoInput.input.value = '1';
        const event = new Event('keydown', {} as any);
        directiveNoInput.input.dispatchEvent(event);
        fixtureNoInput.detectChanges();

        const color = directiveNoInputDebug.nativeElement.style.color;
        const borderColor = directiveNoInputDebug.nativeElement.style.borderColor;

        expect(directiveNoInput['default']).toContain(color);
        expect(directiveNoInput['default']).toContain(borderColor);
    });

    it('should change color & borderColor and use passed in input colors (1)', () => {
        const compInputColors = fixtureInput.componentInstance.colors;
        const directiveInputColors = directiveInput['colors'];
        expect(compInputColors).toEqual(directiveInputColors);

        directiveInput.input.value = '1';
        const event = new Event('keydown', {} as any);
        directiveInput.input.dispatchEvent(event);
        fixtureInput.detectChanges();
        expect(compInputColors).toEqual(directiveInputColors);

        const color = directiveInputDebug.nativeElement.style.color;
        const borderColor = directiveInputDebug.nativeElement.style.borderColor;

        expect(directiveInput['colors']).toContain(color);
        expect(directiveInput['colors']).toContain(borderColor);
    });

    it('should change color & borderColor and use passed in input colors (3)', () => {
        fixtureInput.componentInstance.colors = ['red', 'blue', 'green']
        fixtureInput.detectChanges();

        const compInputColors = fixtureInput.componentInstance.colors;
        const directiveInputColors = directiveInput['colors'];
        expect(compInputColors).toEqual(directiveInputColors);

        directiveInput.input.value = '1';
        const event = new Event('keydown', {} as any);
        directiveInput.input.dispatchEvent(event);
        fixtureInput.detectChanges();
        expect(compInputColors).toEqual(directiveInputColors);

        const color = directiveInputDebug.nativeElement.style.color;
        const borderColor = directiveInputDebug.nativeElement.style.borderColor;

        expect(directiveInput['colors']).toContain(color);
        expect(directiveInput['colors']).toContain(borderColor);
    });
})
