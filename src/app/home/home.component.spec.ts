import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";

import { of, throwError } from "rxjs";
import { delay } from "rxjs/operators";

import { PokemonService } from "../_shared/services/pokemon.service";

import { HomeComponent } from "./home.component";
import { HomeModule } from "./home.module";
import { HttpErrorResponse } from "@angular/common/http";

describe('HomeComponent', () => {

    let fixture: ComponentFixture<HomeComponent>;
    let componentDebug: DebugElement;
    let component: HomeComponent;
    let pokemonService: PokemonService;

    // Sync with debounceTime(3000) from HomeComponent
    const POKEMON_DELAY = 3000;
    // Sample Mock from API
    const POKEMON_MOCK = {
        name: 'Pikachu',
        sprites: {
            back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png",
            back_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/25.png",
            front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
            front_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png",
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HomeModule, HttpClientTestingModule],
            providers: [PokemonService]
        }).compileComponents();

        // Create component to test and detect changes before each test
        fixture = TestBed.createComponent(HomeComponent);
        fixture.detectChanges();

        // References for most common used elements
        componentDebug = fixture.debugElement;
        component = fixture.componentInstance;
        pokemonService = fixture.debugElement.injector.get(PokemonService);
    });

    it('should create the Home Component', () => {
        expect(component).toBeTruthy();
    });

    it('should not show any pokemon before search', () => {
        const pokemonBox = componentDebug.query(By.css('.pokemon'));
        // Pokemon class which shows on ngIf after search is null if not search was done
        expect(pokemonBox).toBeNull();
    });

    // To test async processes we use fakeAsync + tick
    it(`should call getPokemon with value from input`, fakeAsync(() => {
        // We spy the service method and fake a mock (we are not interested to test API here but logic being applied)
        const getPokemonSpy = spyOn(pokemonService, 'getPokemon').and.callFake(() => of(POKEMON_MOCK));
        component.input.nativeElement.value = POKEMON_MOCK.name;
        component.input.nativeElement.dispatchEvent(new Event('keyup'));

        // Important to tick the total time of the async process called
        tick(POKEMON_DELAY);
        fixture.detectChanges();

        // Method have been called after the delay getting passed the mock name as in the input
        expect(getPokemonSpy).toHaveBeenCalledWith(POKEMON_MOCK.name);
    }));

    it(`should call getPokemon after ${POKEMON_DELAY} ms`, fakeAsync(() => {
        const getPokemonSpy = spyOn(pokemonService, 'getPokemon').and.callFake(() => of(POKEMON_MOCK));
        component.input.nativeElement.value = POKEMON_MOCK.name;
        component.input.nativeElement.dispatchEvent(new Event('keyup'));

        tick(POKEMON_DELAY);
        fixture.detectChanges();

        expect(getPokemonSpy).toHaveBeenCalled();
    }));

    it('should not call getPokemon if prev pokemon search was equal', fakeAsync(() => {
        const getPokemonSpy = spyOn(pokemonService, 'getPokemon').and.callFake(() => of(POKEMON_MOCK));
        component.input.nativeElement.value = POKEMON_MOCK.name;
        component.input.nativeElement.dispatchEvent(new Event('keyup'));
        fixture.detectChanges();

        // Tick and check the method has been called correctly
        tick(POKEMON_DELAY);
        expect(getPokemonSpy).toHaveBeenCalled();

        // Empty the input (ignored in the pipe stream so it won't result in any service call)
        component.input.nativeElement.value = '';
        component.input.nativeElement.dispatchEvent(new Event('keyup'));
        fixture.detectChanges();

        // Repeat search (repeated value will be ignored by distinctUntilChanged operator)
        component.input.nativeElement.value = POKEMON_MOCK.name;
        component.input.nativeElement.dispatchEvent(new Event('keyup'));
        fixture.detectChanges();

        // Tick again after new search
        tick(POKEMON_DELAY);

        // Only first search was actually done (empty value ignored, repeated value ignored)
        expect(getPokemonSpy).toHaveBeenCalledTimes(1);
    }));

    it('should show pokemon name', fakeAsync(() => {
        spyOn(pokemonService, 'getPokemon').and.callFake(() => of(POKEMON_MOCK));
        component.input.nativeElement.value = POKEMON_MOCK.name;
        component.input.nativeElement.dispatchEvent(new Event('keyup'));

        tick(POKEMON_DELAY);
        fixture.detectChanges();

        // After successful service call, we got a pokemon mock and ngIf shows content inside as pokemon name
        const pokemonNameElement: HTMLParagraphElement = componentDebug.query(By.css('.pokemon p')).nativeElement;
        expect(pokemonNameElement.textContent).toBe(POKEMON_MOCK.name);
    }));

    it('should show pokemon pictures', fakeAsync(() => {
        spyOn(pokemonService, 'getPokemon').and.callFake(() => of(POKEMON_MOCK));
        component.input.nativeElement.value = POKEMON_MOCK.name;
        component.input.nativeElement.dispatchEvent(new Event('keyup'));

        tick(POKEMON_DELAY);
        fixture.detectChanges();

        // After successful service call, we got a pokemon mock and ngIf shows content inside as pokemon images (4)
        const pokemonImagesDebugElements: DebugElement[] = componentDebug.queryAll(By.css('.pokemon img'));
        const pokemonImagesElements: HTMLImageElement[] = pokemonImagesDebugElements.map(element => element.nativeElement);

        // 4 Images tags we got in template
        expect(pokemonImagesElements.length).toBe(4);

        const mockURLs = [
            POKEMON_MOCK.sprites.back_default,
            POKEMON_MOCK.sprites.back_shiny,
            POKEMON_MOCK.sprites.front_default,
            POKEMON_MOCK.sprites.front_shiny
        ];
        pokemonImagesDebugElements.forEach(pokemonImage => {
            // Each image has src attribute set and containing values inside the mock array (expected images)
            expect(pokemonImage.attributes.src).toBeTruthy();
            expect(mockURLs).toContain(pokemonImage.attributes.src!);
        });
    }));

    // Test that the loading variable - before/while/after search - contains expected value
    it('should show loading only during search', fakeAsync(() => {
        // Add an extra delay of 333 so we check during that time slot the loading value
        const getPokemonSpy = spyOn(pokemonService, 'getPokemon').and.callFake(() => of(POKEMON_MOCK).pipe(delay(333)));
        // Before search, loading value is falsy
        expect(component.loading).toBeFalsy();

        component.input.nativeElement.value = POKEMON_MOCK.name;
        component.input.nativeElement.dispatchEvent(new Event('keyup'));

        tick(POKEMON_DELAY);
        fixture.detectChanges();

        // While searching (after debounceTime(3000)), loading value is truthy
        expect(component.loading).toBeTruthy();
        expect(getPokemonSpy).toHaveBeenCalled();

        // After search is completed, loading value is falsy again
        tick(333);
        expect(component.loading).toBeFalsy();
    }));

    it('should catch error on wrong search and search will continue working', fakeAsync(() => {
        const errorResponse = new HttpErrorResponse({ status: 404, statusText: 'Not Found' });
        const getPokemonSpy = spyOn(pokemonService, 'getPokemon');

        getPokemonSpy.and.returnValue(throwError(errorResponse));

        component.input.nativeElement.value = 'sdjkfh';
        component.input.nativeElement.dispatchEvent(new Event('keyup'));

        tick(POKEMON_DELAY);
        fixture.detectChanges();

        expect(getPokemonSpy).toHaveBeenCalled();
        expect(getPokemonSpy).toHaveBeenCalledWith('sdjkfh');

        getPokemonSpy.and.callFake(() => of(POKEMON_MOCK));
        component.input.nativeElement.value = POKEMON_MOCK.name;
        component.input.nativeElement.dispatchEvent(new Event('keyup'));

        tick(POKEMON_DELAY);
        fixture.detectChanges();

        expect(getPokemonSpy).toHaveBeenCalledTimes(2);
        expect(getPokemonSpy).toHaveBeenCalledWith(POKEMON_MOCK.name);

        const pokemonBox = componentDebug.query(By.css('.pokemon'));
        expect(pokemonBox).not.toBeNull();
    }));
})
