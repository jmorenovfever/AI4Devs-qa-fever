// ***********************************************
// Archivo que define comandos personalizados para Cypress
// https://on.cypress.io/custom-commands
// ***********************************************

// Comando personalizado para simular drag and drop en react-beautiful-dnd
Cypress.Commands.add('dragAndDrop', (draggableSelector, droppableSelector) => {
  // Obtenemos los elementos draggable y droppable
  cy.get(draggableSelector).should('be.visible');
  cy.get(droppableSelector).should('be.visible');

  // Recogemos información sobre el draggable
  cy.get(draggableSelector).then($el => {
    const draggable = $el[0];
    const draggableRect = draggable.getBoundingClientRect();
    const draggableX = draggableRect.left + draggableRect.width / 2;
    const draggableY = draggableRect.top + draggableRect.height / 2;

    // Recogemos información sobre el droppable
    cy.get(droppableSelector).then($droppable => {
      const droppable = $droppable[0];
      const droppableRect = droppable.getBoundingClientRect();
      const droppableX = droppableRect.left + droppableRect.width / 2;
      const droppableY = droppableRect.top + droppableRect.height / 2;

      // Realizamos la simulación del drag and drop
      cy.get(draggableSelector)
        .trigger('mousedown', { button: 0, clientX: draggableX, clientY: draggableY, force: true })
        .trigger('mousemove', { button: 0, clientX: draggableX + 10, clientY: draggableY, force: true })
        .wait(500) // Esperamos para que react-beautiful-dnd detecte el inicio del drag
        .trigger('mousemove', { button: 0, clientX: droppableX, clientY: droppableY, force: true })
        .wait(500) // Esperamos para que react-beautiful-dnd detecte el movimiento
        .trigger('mouseup', { button: 0, clientX: droppableX, clientY: droppableY, force: true });
    });
  });
});

// Para trabajar con react-beautiful-dnd, necesitamos forzar que el dataTransfer esté disponible
// https://github.com/atlassian/react-beautiful-dnd/issues/1426
Cypress.Commands.add('forceDataTransfer', () => {
  if (Cypress.platform === 'darwin') {
    cy.window().then(win => {
      const dataTransfer = new DataTransfer();
      const event = new DragEvent('dragstart', { dataTransfer });
      
      Object.defineProperty(win.HTMLElement.prototype, 'dragstart', {
        value: event
      });
    });
  }
}); 