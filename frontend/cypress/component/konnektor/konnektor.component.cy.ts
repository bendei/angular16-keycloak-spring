import { KonnektorViewComponent } from "../../../src/app/konnektor/konnektor-view.component";
import { of } from 'rxjs';
import {DefaultService, KonnektorDTO} from "../../../src/app/openapi-generated-sources";
import {mount} from "cypress/angular";
import {FormBuilder} from "@angular/forms";
import Chainable = Cypress.Chainable;

describe('KonnektorViewComponent', () => {

  it('should load data', () => {

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

    cy.get('[data-testid="header-one"]').should('be.visible')
      .and('contain', 'Using template reference to call method and property on the child component'
      );

    cy.get('[data-testid="incrementOnChild"]').should("exist")
      .and('contain', 'Methodenaufruf auf dem child componente mit temp ref variable')
      .click();

    cy.get('[data-testid="span-counter"]').should('exist').contains('1');

    // testing datatable
    // Check if datatable is visible
    cy.get('[data-testid="konnektorDataTable"]').should('be.visible');

    // Check datatable columns
    const checkColumn = (name: string) => cy.contains('datatable-header', name).should('be.visible');
    checkColumn('Id');
    checkColumn('Hostname');
    checkColumn('Serial Number');
    checkColumn('Firmware Version');
    checkColumn('Hardware Version');
    checkColumn('Created');
    checkColumn('Active');
    checkColumn('hostNameAndSerial');

    const checkCellText = (row: Chainable, konnektorObj) => cy.contains( '1');

    cy.get('[data-testid="konnektorDataTable"]').find('datatable-row-wrapper') // selector for rows might need to be adjusted
      .each((row, index) => {
        checkRowContainsValue(row, testKonnektorDTOArray[index].id);
        checkRowContainsValue(row, testKonnektorDTOArray[index].hostName);
      });
  });

  /**
   * Check if a datatable row contains a given value.
   *
   * @param {any} row - The datatable row.
   * @param {any} value - The value to check for.
   * @param {number} [cellIndex] - Index of the cell in the row, if specific cell data needs to be checked.
   */
  const checkRowContainsValue = (row: any, value: any, cellIndex?: number) => {
    if (cellIndex !== undefined) {
      cy.wrap(row) // You may change cy.wrap(row) with some other locator, such as cy.get(row)
        .find(`datatable-body-cell:nth-child(${cellIndex})`)
        .should('contain', value);
    } else {
      cy.wrap(row).should('contain', value);
    }
  };

});
