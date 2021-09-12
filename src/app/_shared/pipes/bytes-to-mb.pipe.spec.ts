import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';

import { BytesToMBPipe } from './bytes-to-mb.pipe';

describe('BytesToMBPipe', () => {

    // Isolate test means out of Angular framework, as a simple class/function
    describe('Isolate BytesToMBPipe test', () => {

        // Create the pipe object from its class
        const pipe = new BytesToMBPipe();

        it('should convert bytes to megabytes', () => {
            expect(pipe.transform(100200300)).toBe('95.56MB');
            expect(pipe.transform(123456789)).toBe('117.74MB');
            expect(pipe.transform(987654321)).toBe('941.90MB');
        });

        it('should use the default extension when not passed in', () => {
            expect(pipe.transform(100200300)).toBe('95.56MB');
            expect(pipe.transform(123456789)).toBe('117.74MB');
            expect(pipe.transform(987654321)).toBe('941.90MB');
        });

        it('should override the extension when passed in', () => {
            expect(pipe.transform(100200300, 'Megas')).toBe('95.56Megas');
            expect(pipe.transform(123456789, ' MegaBytes')).toBe('117.74 MegaBytes');
            expect(pipe.transform(987654321, ' mb')).toBe('941.90 mb');
        });
    });

    // Shallow test means inside Angular framework
    describe('Shallow BytesToMBPipe test', () => {

        // Test Component for Shallow testing the pipe
        @Component({
            template: 'Size: {{ size | bytesToMB:suffix }}'
        })
        class TestComponent {
            suffix!: string;
            size = 123456789;
        }

        let component: TestComponent;
        let fixture: ComponentFixture<TestComponent>;
        let el: HTMLElement;

        beforeEach(() => {
            // Declare the test component inside the testing module, and the pipe
            TestBed.configureTestingModule({
                declarations: [TestComponent, BytesToMBPipe],
            });
            fixture = TestBed.createComponent(TestComponent);
            component = fixture.componentInstance;
            el = fixture.nativeElement;
        });

        fit('should convert bytes to megabytes', () => {
            // First, trigger change detection to pick up the value passed in from TestComponent to the pipe
            fixture.detectChanges();
            expect(el.textContent).toContain('Size: 117.74MB');
        });

        it('should use the default extension when not passed in', () => {
            fixture.detectChanges();
            expect(el.textContent).toContain('Size: 117.74MB');
        });

        it('should override the extension when passed in', () => {
            component.suffix = ' MBs';
            fixture.detectChanges();
            expect(el.textContent).toContain('Size: 117.74 MBs');
        });

        it('should convert bytes to megabytes and react to property size and suffix changes', () => {
            // We need to manually trigger change detection after each component change
            fixture.detectChanges();
            expect(el.textContent).toContain('Size: 117.74MB');

            component.size = 0;
            component.suffix = '';
            fixture.detectChanges();
            expect(el.textContent).toContain('Size: 0');
        });
    });
});