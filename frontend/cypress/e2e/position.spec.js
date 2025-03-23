describe('Pruebas E2E para la interfaz de Position', () => {
  // Antes de cada prueba, visitamos la página de detalles de posición
  beforeEach(() => {
    // Activamos el soporte para dragAndDrop
    cy.forceDataTransfer();
    
    // Configuramos un timeout más largo para la visita a la página
    cy.visit('/positions/1', { timeout: 10000 }).then(() => {
      cy.log('Página cargada correctamente');
    });
    
    // Esperamos a que se carguen los datos con un timeout más largo
    cy.wait('@getInterviewFlow', { timeout: 10000 });
    cy.wait('@getCandidates', { timeout: 10000 });
  });

  context('Carga de la Página de Position', () => {
    it('Verifica que el título de la posición se muestra correctamente', () => {
      // Verificamos que el título principal corresponde al nombre de la posición
      cy.contains('h2', 'Desarrollador Frontend Senior', { timeout: 5000 }).should('be.visible');
    });

    it('Verifica que se muestran las columnas correspondientes a cada fase del proceso', () => {
      // Verificamos que existen las columnas para cada fase
      cy.contains('.card-header', 'CV Review', { timeout: 5000 }).should('be.visible');
      cy.contains('.card-header', 'Phone Screening', { timeout: 5000 }).should('be.visible');
      cy.contains('.card-header', 'Technical Interview', { timeout: 5000 }).should('be.visible');
      cy.contains('.card-header', 'Final Decision', { timeout: 5000 }).should('be.visible');
    });

    it('Verifica que las tarjetas de los candidatos se muestran en la columna correcta', () => {
      // Verificamos que el candidato Juan Pérez está en la columna CV Review
      cy.contains('.card-header', 'CV Review', { timeout: 5000 })
        .closest('.card')
        .contains('.card-title', 'Juan Pérez', { timeout: 5000 })
        .should('be.visible');

      // Verificamos que el candidato María López está en la columna Phone Screening
      cy.contains('.card-header', 'Phone Screening', { timeout: 5000 })
        .closest('.card')
        .contains('.card-title', 'María López', { timeout: 5000 })
        .should('be.visible');

      // Verificamos que el candidato Carlos Rodríguez está en la columna Technical Interview
      cy.contains('.card-header', 'Technical Interview', { timeout: 5000 })
        .closest('.card')
        .contains('.card-title', 'Carlos Rodríguez', { timeout: 5000 })
        .should('be.visible');

      // Verificamos que el candidato Ana Martínez está en la columna Final Decision
      cy.contains('.card-header', 'Final Decision', { timeout: 5000 })
        .closest('.card')
        .contains('.card-title', 'Ana Martínez', { timeout: 5000 })
        .should('be.visible');
    });
  });

  context('Cambio de Fase de un Candidato', () => {
    it('Simula el arrastre de una tarjeta de candidato de una columna a otra', () => {
      // Identificamos el candidato a mover
      cy.contains('.card-title', 'Juan Pérez', { timeout: 5000 })
        .closest('.card')
        .as('candidato');
        
      // Identificamos la columna de destino  
      cy.contains('.card-header', 'Phone Screening', { timeout: 5000 })
        .closest('.card')
        .as('destino');
        
      // Utilizamos nuestro comando personalizado mejorado para simular drag and drop
      cy.dragAndDrop('@candidato', '@destino');
      
      // Verificamos que se ha enviado la petición PUT al backend
      cy.wait('@updateCandidate', { timeout: 10000 }).its('request.body').should('include', {
        applicationId: 101,
        currentInterviewStep: 2
      });
      
      // Verificamos que la tarjeta ahora está en la nueva columna
      cy.contains('.card-header', 'Phone Screening', { timeout: 5000 })
        .closest('.card')
        .contains('.card-title', 'Juan Pérez', { timeout: 5000 })
        .should('be.visible');
    });
  });
}); 