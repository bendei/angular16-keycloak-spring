// testing with signals
https://www.cypress.io/blog/2023/04/19/switching-to-signals-angular
// keycloak with cypress
https://github.com/Fredx87/cypress-keycloak-commands
// errors
https://docs.cypress.io/guides/references/error-messages
// organizing test in folder
https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests
// indulásnak:
https://docs.cypress.io/guides/component-testing/getting-started
// cypress commands , like cy.get
https://docs.cypress.io/api/table-of-contents
// best practices
https://docs.cypress.io/guides/references/best-practices
// stubs spy clock
https://www.dawsoncodes.com/posts/6/how-to-use-stubs-with-cypress
https://glebbahmutov.com/cypress-examples/commands/spies-stubs-clocks.html#call-the-spy-from-the-test
https://docs.cypress.io/examples/recipes#Stubbing-and-spying

running cypress headfull: npx cypress open
in headless: npx cypress run --headless --e2e

To run Cypress e2e test agains keycloak , cypress test must be able to login durin running into keycloak.
first install : npm install --save-dev cypress-keycloak-commands

https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests:
  - he test interface, borrowed from Mocha, provides describe(), context(), it() and specify().
  - Mocha stellt hooks zur Verfügung: before(), beforeEach(), afterEach, after
  - Cypress supports both BDD (expect/should) and TDD (assert) style plain assertion

Über assertions:
https://docs.cypress.io/guides/core-concepts/retry-ability

!! cypres command are queued and run asynchronously, so können with teh() verwenden:cy.get('button').then(($btn) => {
    // $btn is the object that the previous
    // command yielded us
})

// hogyan dolgozzunk buttonnal submittal stb:
https://docs.cypress.io/guides/core-concepts/variables-and-aliases


COMPONENT TEST (kan ein angular component, ein button ect sein, custom date picker)
    import { StepperComponent } from './stepper.component'      // wir importieren das Komponent, welches wir testen wollen
    
    describe('StepperComponent', () => {    // top-level method , a container (test fixture), der beinhaltet die individuelle Tests (test case in junit) 

        it('mounts', () => {                // 1. param: testname, 2. param: funktion der den test code enthaelt
            // see: https://on.cypress.io/mounting-angular
            cy.mount(StepperComponent)      // mounting, so das wir test gegenüber der Komponent ausführen können. Soll in jedem it() gerufen.
        })
    })

HOW TO STUB API RESPONSES:

A.: ki tudjuk az adott service-ben stubbolni az adott metódust:
    const testKonnektorDTOArray: KonnektorDTO[] = [
        {
            hostName: 'TestHost1',
            id: 1,
            serialNumber: '123456',
            firmwareVersion: '1.0.0',
            hardwareVersion: '1.0.0',
            active: true,
            created: '2022-01-01',
            validUntil: '2023-01-01',
            auditlogs: []
        }
    ];

    const defaultService = {
      getAllKonnektors: cy.stub().returns(of(testKonnektorDTOArray ))
    };

    mount(KonnektorViewComponent, {
        providers: [{ provide: DefaultService, useValue: defaultService }, FormBuilder],
        declarations: [],
        imports: [] // import additional required modules here
    });

B.: https://testgrid.io/blog/cypress-intercept/    "Cypress Intercepts implementation" résznél
    Teória: mielőtt a komponens egy esemény vagy onInit()ben meghivna egy pl GET requestet, azelott a cy.intercept()-al kimonndjuk hogy az adott GET request az adott URL -en ne legyen valósan kiküldve,
            hanem, fogjuk el és helyette egy fixture json fájlt adjunk vissza resonseként. Azaz a kérés ne menjen ki, hanem egy mock kérés fusson le helyben!!npx 

    cy.intercept() -> wir fangen ab Funktionality und geben ein Response zurück de von einem fixture (json) Datei kommt.
    - a cypress/fixtures/mock_data.json fileben definiálom a response datat (szemben a fentivel, ahol beégetem a kódba)
    - describe('Intercepting Network Requests', () => {
        it('should intercept a GET request', () => {
        
        
        // Intercept a GET request to a specific URL
        cy.intercept('GET', '/api/posts', { fixture: 'posts.json' }).as('getPosts');
        
        // Visit the page that triggers the GET request
        cy.visit('/');
        
        
        // Perform actions that trigger the GET request, e.g., click a button
        
        
        // Wait for the intercepted request to complete
        cy.wait('@getPosts').then((interception) => {
        
        
        // Verify the response or perform assertions
        expect(interception.response.statusCode).to.equal(200);
        expect(interception.response.body).to.have.length(3); // Assuming 'posts.json' contains an array of 3 posts
        });
        });
        });

END-TO-END TESTS




