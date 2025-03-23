// ***********************************************************
// Este archivo se carga automáticamente antes de las pruebas
// https://on.cypress.io/configuration
// ***********************************************************

// Importar comandos
import './commands'

// Desactivar la captura de excepciones no controladas para hacer debugging más fácil
Cypress.on('uncaught:exception', (err, runnable) => {
  // Retornar false aquí evita que Cypress falle la prueba
  return false;
});

// Comportamiento global para todos los tests
beforeEach(() => {
  // Log para ayudar a diagnosticar problemas
  cy.log('Comenzando nueva prueba E2E');
  
  // Interceptar las llamadas a la API y proporcionar datos de prueba
  cy.intercept('GET', 'http://localhost:3010/positions/*/interviewFlow', {
    fixture: 'interviewFlow.json'
  }).as('getInterviewFlow');
  
  cy.intercept('GET', 'http://localhost:3010/positions/*/candidates', {
    fixture: 'candidates.json'
  }).as('getCandidates');
  
  cy.intercept('PUT', 'http://localhost:3010/candidates/*', {
    statusCode: 200,
    body: { success: true }
  }).as('updateCandidate');
}); 