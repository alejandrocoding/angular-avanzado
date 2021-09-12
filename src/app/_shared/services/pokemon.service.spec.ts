import { PokemonService } from "./pokemon.service";
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PokemonService', () => {

    let service: PokemonService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            // Import HttpClientTestingModule to be able to mock http requests
            imports: [HttpClientTestingModule],
            providers: [PokemonService]
        })
        // Inject Service and Http Mock
        service = TestBed.inject(PokemonService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        // Verify no http requests is pending after each test
        httpMock.verify();
    });

    it('should fetch pokemon with id 1 by mock service', () => {
        // Declare pokemon mock
        const pokemonMock = { id: 1 };

        // Pass 1 to getPokemon as id and expect the mock id to match
        service.getPokemon('1').subscribe(pokemon => expect(pokemon.id).toBe(pokemonMock.id));

        // Configure the mock to avoid real http request and resolve the request with the mock
        httpMock.expectOne(`${service['url']}/1`).flush(pokemonMock);
    });

    it('should invoke getPokemon one time', () => {
        // Spy service method and check it is only being called when required
        const serviceSpy = spyOn(service, 'getPokemon').and.callThrough();
        expect(serviceSpy).not.toHaveBeenCalled();

        const pokemon1Mock = { id: 1 };
        service.getPokemon('1').subscribe(pokemon => expect(pokemon.id).toBe(1));
        httpMock.expectOne(`${service['url']}/1`).flush(pokemon1Mock);

        expect(serviceSpy).toHaveBeenCalled();
    });

    it('should fetch 3 pokemon by ids by mock service and been called 3 times', () => {
        // Declare 3 mocks
        const pokemon1Mock = { id: 1 };
        const pokemon2Mock = { id: 2 };
        const pokemon3Mock = { id: 3 };

        const serviceSpy = spyOn(service, 'getPokemon').and.callThrough();
        expect(serviceSpy).not.toHaveBeenCalled();

        // Expect that id passed in to service method will match expected mock id
        service.getPokemon('1').subscribe(pokemon => expect(pokemon.id).toBe(1));
        service.getPokemon('2').subscribe(pokemon => expect(pokemon.id).toBe(2));
        service.getPokemon('3').subscribe(pokemon => expect(pokemon.id).toBe(3));

        // Set the mock data as per request URL
        httpMock.expectOne(`${service['url']}/1`).flush(pokemon1Mock);
        httpMock.expectOne(`${service['url']}/2`).flush(pokemon2Mock);
        httpMock.expectOne(`${service['url']}/3`).flush(pokemon3Mock);

        // Check that service is being called 3 times
        expect(serviceSpy).toHaveBeenCalledTimes(3);
    });

    it('should fetch pokemon by GET method', () => {
        const pokemon1Mock = { id: 1 };

        service.getPokemon('1').subscribe(pokemon => expect(pokemon.id).toBe(1));

        const req3 = httpMock.expectOne(`${service['url']}/1`);
        req3.flush(pokemon1Mock);

        // Check that service is called by method GET
        expect(req3.request.method).toBe('GET');
    });
})