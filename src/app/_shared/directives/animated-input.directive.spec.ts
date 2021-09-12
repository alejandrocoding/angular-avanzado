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

    // Declare Test Component without using directive @Input() colors
    @Component({
        template: `
            <h1>Hello from Test Component</h1>
            <input type="text" appAnimatedInput>
        `
    })
    class TestNoInputComponent { }

    // Declare Test Component using directive @Input() colors
    @Component({
        template: `
            <h1>Hello from Test Component</h1>
            <input type="text" appAnimatedInput [colors]="colors">
        `
    })
    class TestInputComponent {
        // Declare the colors to be passed in as @Input to directive
        colors = ['red'];
    }

    beforeEach(() => {
        const _fixture = TestBed.configureTestingModule({
            declarations: [TestNoInputComponent, TestInputComponent, AnimatedInputDirective]
        });
        // We can create components after configureTestingModule
        fixtureNoInput = _fixture.createComponent(TestNoInputComponent);
        fixtureInput = _fixture.createComponent(TestInputComponent);

        // Trigger change detection before each test for each test component
        fixtureNoInput.detectChanges();
        fixtureInput.detectChanges();

        // Get references for DebugElement for each test component by directive selector
        directiveNoInputDebug = fixtureNoInput.debugElement.query(By.directive(AnimatedInputDirective));
        directiveInputDebug = fixtureInput.debugElement.query(By.directive(AnimatedInputDirective));

        // Get references to directives
        directiveNoInput = directiveNoInputDebug.injector.get(AnimatedInputDirective);
        directiveInput = directiveInputDebug.injector.get(AnimatedInputDirective);
    });

    it('should be used in a input element', () => {
        // Access the HTMLElement names where the directives are applied
        expect(directiveInputDebug.name).toBe('input');
        expect(directiveNoInputDebug.name).toBe('input');
    });

    it('should change color & borderColor and match colors after keydown event on its input field', () => {
        // To recognize an input value change, set value, trigger keydown event and trigger change detection before use expect
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

        // Accessing private default property of directive
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

        // Accessing directive nativeElements (input) styles
        const color = directiveInputDebug.nativeElement.style.color;
        const borderColor = directiveInputDebug.nativeElement.style.borderColor;

        // Accessing private colors property of directive
        expect(directiveInput['colors']).toContain(color);
        expect(directiveInput['colors']).toContain(borderColor);
    });

    it('should change color & borderColor and use passed in input colors (3)', () => {
        // Setting component property values
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
